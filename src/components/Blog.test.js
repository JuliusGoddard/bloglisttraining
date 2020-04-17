import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";
import Togglable from "./toggalable";
import BlogForm from "./blogForm";

describe("<Togglable />", () => {
  let component;

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="show...">
        <div className="testDiv" />
      </Togglable>
    );
  });

  test("renders its children", () => {
    expect(component.container.querySelector(".testDiv")).toBeDefined();
  });
});
