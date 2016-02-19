FastJPReader
============

This is a bookmarklet to help read Japanese text faster. The concept comes from Spritz.

Add the bookmarklet from [bookmarklet.js](https://github.com/yishihara/FastJPReader/blob/master/bookmarklet.js).

This bookmarklet uses [TinySegmenter](http://chasen.org/~taku/software/TinySegmenter/) as a library for parsing Japanese text. Please refer to the link for information on the library.

Try using a stopwatch to time how fast you can read a given number of Japanese letters normally. Then try using the FastJPReader at what ever speed you find comfortable. You might be able to read faster using this! Well, at least I was able to... Have fun :), and more updates to come hopefully.

## How to use:
- First select some text
- Then click on the bookmarklet
- The bookmarklet will ask for the letter per minute (lpm) to be used (first try with 400lpm, then work your way up)

## Some known problems:
- Currently, the bookmarklet can only be used on UTF-8 encoded text.
- Obviously, parsing of the Japanese is not the best. English is much easier to parse because of spaces between words.

## Some interesting facts:
- Japanese people on average read 400 to 600lpm
- Because of the algorithm used in FastJPReader, the lpm will actually be a little faster than the user selected lpm
