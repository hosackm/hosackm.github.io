---
title: "Example Post"
date: 2024-08-20T09:05:01-07:00
images:
tags:
  - test
  - example
  - markdown
---

# Some Title

This is some content to test out markdown rendering.

| ID  | Name        | Age | Email                | Location    |
|-----|-------------|-----|----------------------|-------------|
| 1   | Alice Smith  | 28  | alice.smith@example.com  | New York    |
| 2   | Bob Johnson  | 34  | bob.johnson@example.com  | Los Angeles |
| 3   | Carol Davis  | 45  | carol.davis@example.com  | Chicago     |
| 4   | Dave Wilson  | 29  | dave.wilson@example.com  | Houston     |
| 5   | Eve Taylor   | 31  | eve.taylor@example.com   | Phoenix     |
| 6   | Frank Harris | 22  | frank.harris@example.com | Philadelphia|
| 7   | Grace Lee    | 37  | grace.lee@example.com    | San Antonio |
| 8   | Henry Clark  | 40  | henry.clark@example.com  | San Diego   |
| 9   | Ivy Lewis    | 27  | ivy.lewis@example.com    | Dallas      |
| 10  | Jack Martin  | 33  | jack.martin@example.com  | San Jose    |

```python
def fibonacci(n):
  if n < 0:
    return -1
  if n < 2:
    return n

  prev, fib = 0, 1
  while n > 1:
    prev, fib = fib, prev + fib
    n -= 1

  return fib
```

This is a sentence with a [link](http://www.google.com).
