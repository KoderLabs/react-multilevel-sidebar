# React Multilevel Sidebar

[![version](https://img.shields.io/badge/version-1.0.0-gree.svg)](https://www.npmjs.com/package/react-multilevel-sidebar)

react-multilevel-sidebar is a sidebar component for web and responsive mobile layout it gives
you nested level menu where you can categorize your items.

## DEMO

![React Sidebar Component Gif](https://media.giphy.com/media/SUWrUv6pSSSZ1tK1Ct/giphy.gif)

## Getting Started

### Installation

```sh
npm install --save react-multilevel-sidebar
```

### Exports

Here's how to use it:

```js
import MultilevelSidebar from "react-multilevel-sidebar";
import "react-multilevel-sidebar/src/Sidebar.css";
```

## Basic Usage

```jsx
import React, { Component } from "react";
import MultilevelSidebar from "react-multilevel-sidebar";
import "react-multilevel-sidebar/src/Sidebar.css";

let options = [
  {
    title: "Education",
    titleIcon: <i className="fa fa-graduation-cap"></i>,
    content: [{ id: 1, name: "My courses", to: "/my-courses" }]
  },
  {
    title: "Most popular",
    titleIcon: <i className="fa fa-paragraph"></i>,
    hideBorder: true,
    content: [
      {
        id: 2,
        name: "Web Development",
        icon: <i className="fa fa-chrome"></i>,
        children: [
          {
            title: "JavaScript",
            titleIcon: <i className="fa fa-opera"></i>,
            content: [
              {
                id: 3,
                name: "functions",
                ["Some property i need on clicking this"]: "value"
              }
            ]
          }
        ]
      }
    ]
  }
];

class MyComponent extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false
    };
  }

  //   you can also use this function on any of your event to open/close the sidebar
  handleSidebarToggle = isOpen => {
    this.setState({ isOpen });
  };

  handleClick = itemOptions => {
    /* 
        do something with the item you clicked.
        you can also send custom properties of your choice
        in the options array you'll be getting those here
        whenever you click that item
    */
  };

  render() {
    return (
      <div>
        <MultilevelSidebar
          open={this.state.isOpen}
          onToggle={this.handleSidebarToggle}
          options={options}
          header="React-MultiLevel-Sidebar"
          onItemClick={this.handleClick}
        />
        {/* using in our button to open the sidebar */}
        <button onClick={() => this.handleSidebarToggle(true)}>open</button>
      </div>
    );
  }
}

export default MyComponent;
```

#### `<MultilevelSidebar/>` Props:

| Prop name        | Type                  | Description                                                                                                                                     |
| ---------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| open             | `boolean`             | Shows or hide the sidebar.                                                                                                                      |
| onToggle         | `function`            | function to change the current state of sidebar, to show or to hide.                                                                            |
| options          | `Array`               | having all the options of the sidebar ([see details](https://github.com/omerkhan8/react-multilevel-sidebar#options))                            |
| header           | `string|element|node` | main header of the sidebar, it could be some string text, or a custom react component.                                                          |
| persist          | `boolean`             | if true the sidebar will open from the level where it was closed, else sidebar will always open from the first level.                           |
| wrapperClassName | `string`              | css class for custom styles will be applied on sidebar main wrapper, you can then override the styles for nested elements using selectors.      |
| headerClassName  | `string`              | css class for header if not using a custom header by composition. you can style the default one.                                                |
| onClose          | `function`            | this function will be triggered whenever the sidebar will be closed                                                                             |
| onItemClick      | `function`            | this function will be triggered whenever you'll click on any item in the sidebar. It will recieve options from that item in the first parameter |
| onBackClick      | `function`            | this function will be triggered every time the back button will be pressed from a nested level.                                                 |

#### `Options`

Options is the main prop for the sidebar here you can define/structure how your sidebar will looks like. (It is better to create a seperate file for your options and then import it where ever you're using this component and then pass it there as a prop).
It will be an array of objects, the first level object will be specifying the title and heading for a specific category they're optional so if you don't want to break into the categories you can skip them and only use the `content` property.
content will be an array of objects which will have all the items in that category **each object must contain an `id` property its value can be any random number but you must pass it.** if any of your content contains another level you can just pass a children array and its structure will be same as the first level, define title etc and then an content array.
e.g:

```jsx
let options = [
  {
    title: "Education",
    titleIcon: <i className="fa fa-graduation-cap"></i>,
    hideBorder: false,
    disabled:false,
    content: [{ id: 1, name: "My courses", to: "/my-courses" }]
  },
  {
    title: "Most popular",
    titleIcon: <i className="fa fa-paragraph"></i>,
    hideBorder: true,
    disabled:false,
    content: [
      {
        id: 2,
        name: "Web Development",
        icon: <i className="fa fa-chrome"></i>,
        children: [
          {
            title: "JavaScript",
            titleIcon: <i className="fa fa-opera"></i>,
            hideBorder: true,
            content: [
              {
                id: 3,
                icon: <i className="fa fa-refresh"></i>
                name: "functions",
                disabled: false,
                to:"/web-development/javascript",
                ["Some property i need on clicking this"]: "value",
                children: [] //for another level
              }
            ]
          }
        ]
      }
    ]
  }
];
```

### The properties inside the object:

##### `title`: string (optional)

shows the title of a specific category.

##### `titleIcon`: element (optional)

icon for the title.

##### `hideBorder`: boolean (optional)

each category is seprated by a separator you can remove it by passing true to this option.

##### `content`: array (required)

An array of objects containing the items in that category.

### The properties inside content are below:

##### `id`: number (required)

it can be any number must be unique for each item and it is required for each items.

##### `name`: string (required)

name of the item

##### `to`: string:route (optional)

if you want to navigate to a route on clicking the item you can pass the route in the option

##### `disabled`:boolean (optional)

If true that item will be disabled, and user won't be able to click it

##### `icon`: element (optional)

icon for the item.

##### `children`: array (optional)

if you want another level for the sidebar you can pass the children to a specific item,
the same above structure will be repeated for each children.

##### `your options`: any (optional)

whenever you'll click an item `onItemClick` callback will be triggered and it will have the options for that item in its first parameter, you may want something in those options for your custom logic, so you can simply pass them here in the options so you can do something with them when you click it.

you can see the nested options example [here](https://github.com/omerkhan8/react-multilevel-sidebar/blob/master/example/Sidebar.config.js)

## License

This source code is licensed under the MIT license.

## Author

| name      | email                 |
| --------- | --------------------- |
| Omer Khan | omerkhan842@gmail.com |
