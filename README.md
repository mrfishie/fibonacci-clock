![Fibonacci Clock](http://i.imgur.com/UHIxeOr.jpg)

# Javascript Fibonacci Clock

A beautiful little clock for your bedside table, inspired by [the Fibonacci Clock kickstarter](https://www.kickstarter.com/projects/basbrun/fibonacci-clock-an-open-source-clock-for-nerds-wit/video_share).

The clock is displayed in a web browser, by opening the `index.html` file provided.

## Using the Clock

There are two ways to use the clock:

 1. **Recommended:** View it online at [mrfishie.github.io/fibonacci-clock](https://mrfishie.github.io/fibonacci-clock/)
 2. Clone the repo and view it locally.

Cloning the repo is a bit more complicated. First, you need `git` installed. Navigate to the directory where you would like to place the clock, and run the command

```
git clone https://github.com/mrfishie/fibonacci-clock
```

The repo will be cloned into the `fibonacci-clock` directory. To view the clock, open the `index.html` file in this directory in your browser.

## Reading the Clock

The clock displays hours, minutes, and seconds, using the first five Fibonacci numbers: 1, 1, 2, 3, 5. The sizes of the boxes are equivalent to the number they represent:

![Labelled Fibonacci Clock](http://i.imgur.com/P0hdiwD.jpg)

The colour of the cells are used to determine if the cell is adding to the minutes or hours. The colours are:

 - Blue - empty (ignore)
 - Red - hours
 - Green - minutes
 - Yellow - hours and minutes

To find the hours, add up the values of each of the red and yellow squares. This will give you a number between 1 and 12.

To find the minutes, add up the values of each of the green and yellow squares, and then multiply this by 5. This will give you a number between 0 and 60.

The amount of seconds are shown by white flashes on blocks every 5 seconds. These are calculated in the same way as minutes.

To view the complete current time, move your mouse underneath the boxes. The full time will be shown.
