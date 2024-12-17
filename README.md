# Heat Map - D3.js

### Description

- Creating a program that takes a large dataset and automatically displays it as a Heat Map using D3.js
- The project was built with JavaScript, HTML and CSS

* Using a large dataset consisting of over 1000 data entries and visualizing it in the form of a Heat Map using D3.js
* The Heat Map had to have a list of functions.
* One of the functions was that if the dataset is altered or modified, then the Heat Map would render that modification (if it is still in a dataset format).
* The other function was that when hovering over areas on the Heat Map, it will display a tooltip providing a description (a short one) of the hovered area. The description should be linked to the dataset's ID.
* Another aim of this project was to produce axes for the Heat Map.

### The bar chart should look similar to this:
![image](https://assets.codepen.io/5744159/internal/screenshots/pens/ExXKNLe.default.png?fit=cover&format=auto&ha=false&height=360&quality=75&v=2&version=1630529925&width=640)

> I used the D3 svg-based visualization library to visualize the data

### User stories/tests to pass:

- [x] My heat map should have a title with a corresponding id="title".

- [x] My heat map should have a description with a corresponding id="description".

- [x] My heat map should have an x-axis with a corresponding id="x-axis".

- [x] My heat map should have a y-axis with a corresponding id="y-axis".

- [x] My heat map should have rect elements with a class="cell" that represent the data.

- [x] There should be at least 4 different fill colors used for the cells.

- [x] Each cell will have the properties data-month, data-year, data-temp containing their corresponding month, year, and temperature values.

- [x] The data-month, data-year of each cell should be within the range of the data.

- [x] My heat map should have cells that align with the corresponding month on the y-axis.

- [x] My heat map should have cells that align with the corresponding year on the x-axis.

- [x] My heat map should have multiple tick labels on the y-axis with the full month name.

- [x] My heat map should have multiple tick labels on the x-axis with the years between 1754 and 2015.

- [x] My heat map should have a legend with a corresponding id="legend".

- [x] My legend should contain rect elements.

- [x] The rect elements in the legend should use at least 4 different fill colors.

- [x] I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.

- [x] My tooltip should have a data-year property that corresponds to the data-year of the active area.


## CodePen Project Link
You can view my project on CodePen using this link:
[*Heat Map in D3* by Kutz](https://codepen.io/kutzz/pen/ZEwwJYN)
