+++
title = "Where I start, when I start with C"
date = 2025-01-05
genres = ["code"]
tags = ["code", "programming", "c"]
draft = false
+++

As much as I love C, the developer experience provided by the language is pretty lacking. If you compare it to more modern languages like Go, Zig, or Rust, you'll soon realize it's nice to have a language tools that not only compile your programs but also format, provide LSP functionality, and can run your tests etc.

That's not to say tools don't exist to provide you with all of these features. It's just __your__ responsibility to assemble all the parts. Which can be tedious. This is the setup that I've come to use when developing C using Visual Studio Code.

{{< warning >}}
This is in no way an exhaustive list of configuration values but merely a starting point.
{{< /warning >}}

---

<!--more-->
## TLDR;
You can check out my [gist](https://gist.github.com/hosackm/c3e34d75a1f4496b6f5aec1803aa2032#file-readme-md) if you don't feel like reading the article.

Here are the 3 baseline tools I require when starting any C project.

## CMake

CMake is great for generating build files and integrating other cmake projects. It is still the standard for C/C++ codebases, although a minority of newer projects may use newer build systems like Meson or Zig.

Once you have a working `CMakeLists.txt` file you easily modify your build type, pull in other libraries that use CMake, or generate compilation databases for you LSP to use.

While the syntax can take some getting used to, I find myself often copying and reusing sections from a working `CMakeLists.txt`. In fact, you can probably have an LLM spit out a decent CMake file for you.

## clang-format

Many teams will agree with me that clang-format is a great tool for enforcing style guides, especially when you have multiple developers commiting to the same codebase. I enjoy using it in my private projects as well. It takes no time to copy a simple [.clang-format](https://gist.github.com/hosackm/c3e34d75a1f4496b6f5aec1803aa2032#file-clang-format) file into your codebase. And if you're a bit picky about the formatting of your code (like me), your`<return>` and `<space>` keys will be thankful.

## clangd

LSPs are taken for granted nowadays, but I can remember a time when autocomplete was non-existent or primitive. Even though my mental model of the languages I code in is large and my grep skills are strong, I appreciate the amount of time I save by removing unnecessary context switching. With an LSP I can navigate to a function's implementation, remind myself of the argument list to a function, or even auto-complete snippets I use frequently.

That's why I always make sure to include a [.clangd](https://gist.github.com/hosackm/c3e34d75a1f4496b6f5aec1803aa2032#file-clangd) file in my repository. Since I'm using CMake in my projects I just configure it to output a `compile_commands.json` compilation database and have clangd gather the information it needs from there.

## Further Tooling

Eventually if a project grows large enough or requires more testing, stability, or optimized releases I'll add any of the following:

* address sanitizers - your compiler will most likely have one.
* memory leak detection - using [valgrind](https://valgrind.org/) on Linux or [leaks](https://keith.github.io/xcode-man-pages/leaks.1.html) on MacOS.
* unit testing - I've used [gtest](https://github.com/google/googletest), [criterion](https://github.com/Snaipe/Criterion), and [Catch](https://github.com/catchorg/Catch2) in the past.
