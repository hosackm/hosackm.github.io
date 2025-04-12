+++
title = "Deepening Zig knowledge with zpotify"
date = 2025-04-12
images = []
tags = ["zig", "programming", "spotify", "music"]
draft = false
+++

My favorite non-trivial Zig learnings while writing zpotify.

<!--more-->

# Zpotify

One of my current obsessions is [Zig](https://ziglang.org). I feel that it hits the sweet spot for a systems programming language, in that (among many other things) it:

* Embraces C interoperability instead of trying to replace it
* Has ["only one obvious way to do things"](https://ziglang.org/documentation/master/#toc-Zen)
* Adds many features missing from C _but not too many_

I started my learning Zig in 2024. Since then, I grown to love the language more and more. At first I was only tinkering with the language and found myself not able to explore it's entire standard library or make use of some of the newer concepts that it's syntax allows. That's why I decided to try writing a non-trivial project in it.

[Zpotify](https://github.com/hosackm/zpotify) is a Spotify client loosely based on a [popular golang package](https://github.com/zmb3/spotify). It allows Spotify Premium users a way to interact with the [Spotify Web API](https://developer.spotify.com/documentation/web-api) do things like:

* search through Spotify's music catalog
* follow artists
* create playlists
* control audio playback

After spending a month on the project I've learned a lot. And I'm here to share some things I found cool and some things I wish the language could handle better.

## Things I Like

Here are the things I either learned to like about the language or things I knew I'd liked before trying it out.

### Great standard library

Thoughtfully designed, modern, and actually usable for real-world tasks. Includes things like formatting, file IO, hashing, parsing, and more—without pulling in external dependencies. As I started the project I reinvented a few elements that are in the standard library but I couldn't find them when searching through the docs.

Here's an example that could've been replaced with [this](https://ziglang.org/documentation/master/std/#std.Uri.Component.percentEncode):

```zig
// Escapes a string for inclusion in a URL. Unsupported characters are converted
// to their corresponding ASCII 2 digit hex codes preceded by a %.
pub fn escape(alloc: std.mem.Allocator, s: []const u8) ![]u8 {
    var list = std.ArrayList(u8).init(alloc);
    const convert: []const u8 = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{`}~";

    for (s, 0..) |c, n| {
        const slice = s[n .. n + 1];
        if (!std.mem.containsAtLeast(u8, convert, 1, slice)) {
            try list.append(c);
            continue;
        }
        var buf: [3]u8 = undefined;
        for (try std.fmt.bufPrint(&buf, "%{X}", .{c})) |ch| try list.append(ch);
    }

    return list.toOwnedSlice();
}
```

### Rich and ergonomic type system

From tagged unions to optionals to slices and error unions, the type system strikes a great balance between safety and control. Error unions (!T) are particularly elegant for propagating and handling errors. The fact that types are first-class citizens in the language and only exist at compile-time, means you can do some interesting things.

For example, you can build a type at compile time like I did [here](https://github.com/hosackm/zpotify/blob/c1cdf276fe45e7be55e0792223692a587b0d5483/src/types.zig#L147C1-L171C2)

```zig
// Create a new struct type wrapping a slice of type T with the field name set to name.
// Spotify's API will return arrays of objects in a JSON object with a specific name as the key.
//
// For example, Manyify(Artist, "artists") -> struct { artists: []const Artist }
pub fn Manyify(
    comptime T: type,
    comptime name: [:0]const u8,
) type {
    return @Type(.{
        .Struct = .{
            .layout = .auto,
            .fields = &[_]Field{
                .{
                    .name = name,
                    .type = []const T,
                    .default_value = null,
                    .is_comptime = false,
                    .alignment = @alignOf(T),
                },
            },
            .decls = &[_]Decl{},
            .is_tuple = false,
        },
    });
}
```

### Memory allocators - memory leak detection!

The allocator model is built into the standard library and makes it easy to write generic, flexible code that works with any kind of allocation strategy—heap, arena, stack, etc. At first, it is a bit strange to have to specify the memory allocator in so many function calls. But once I got used to it, I must say it makes things great.

The fact that the interface for allocators is generic makes it so you can swap out an allocator very simply. And the allocators they provide have great features like built-in memory leak detection. Bye bye valgrind.

### Comptime instead of macros!

Another feature that took a while to warm to was `comptime`. When first using the language it would pop up in compilation errors and to be honest I tried to avoid the feature as much as possible because I didn't understand it. But once you wrap your head around which variables depend on runtime information and which don't, you can do some very powerful things. [Like](https://github.com/hosackm/zpotify/blob/c1cdf276fe45e7be55e0792223692a587b0d5483/src/types.zig#L249), defining new types at compile-time based on the code you actually write.

## Things that could be better

But it's not all smooth sailing. Like any young language, it’s got some rough edges—especially when you move beyond "hello world" and start integrating with real-world services. Here are a few things that gave me grief:

### JSON Parsing Is a Pain for Anything Non-Trivial
Zig’s std.json can handle basic parsing, but the moment your data model has even a little complexity—nested structs, optional fields, etc.—you’re in for a frustrating time. The documentation doesn’t do a great job explaining how to write parsing logic for your own types, and when things break, you’re often left spelunking through the std.json source or stepping through with a debugger to figure out what went wrong. It can work, but getting there sometimes feels like more effort than it should be.

### HTTP DELETE Can’t Have a Body (According to Zig)
This one hit me when I was writing a method to delete content on the Spotify API. Zig's [std.http.client](https://ziglang.org/documentation/master/std/#std.http.Client) simply doesn’t allow a body in `DELETE` requests, even though the [RFC](https://datatracker.ietf.org/doc/html/rfc7231#section-4.3.5) doesn’t explicitly forbid it—and plenty of APIs (Spotify included) make legitimate use of it. I ended up patching around it, but it definitely felt like the standard library was being overly strict.

### 3rd Party Packages Are Missing
If you need things like OAuth, redirect handling, or cookie management, be prepared to roll your own. I had to implement my own OAuth flow just to interact with APIs like Spotify, which isn’t the end of the world—but it’s a reminder that Zig’s ecosystem is still growing, and sometimes you’ll have to do more heavy lifting than you’d expect in more mature environments.


# Conclusion

Zig isn’t perfect—but that’s exactly what makes it exciting. It’s a language that dares to rethink old assumptions without trying to be clever for its own sake. Writing Zpotify was an exercise in frustration and joy. I ran into walls, sure, but I also found elegant, low-level control and a modern standard library that didn’t get in my way.

For a project that talks to a real-world API, manages memory, parses JSON, and wraps Spotify’s sprawling data model—Zig held up remarkably well. If you're the kind of developer who enjoys understanding what your code is really doing, and you're okay occasionally diving into the guts of a languages implementation and stdlib, I think you’ll find a lot to love here too.
