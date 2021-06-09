import React from "react";

import { create, update } from "react-test-renderer";
import Gallery from "../components/Gallery";
import NoImages from "../components/NoImages";
import Image from "../components/Image";

let component;

const props = {
  data: [],
};

describe("<Gallery />", () => {
  beforeEach(() => {
    component = create(<Gallery {...props} />);
  });

  it("Se renderiza correctamente", () => {
    expect(component).toBeDefined();
    expect(component.toJSON().type).toEqual("div");
    expect(component.root.findByType("ul")).toBeDefined();
  });

  it("Muestra NoImagenes si la data esta vacía", () => {
    expect(component.root.findByType(NoImages)).toBeDefined();
  });

  it("renderiza las imgs si la data existe o cambia ", () => {
    const data = [
      {
        farm: "farm1",
        server: "serverTest",
        id: 1,
        secret: "secret00",
        title: "hey",
        url: "uri1",
      },
      {
        farm: "farm2",
        server: "serverTest",
        id: 2,
        secret: "secret01",
        title: "hey",
        url: "uri2",
      },
      {
        farm: "farm3",
        server: "serverTest",
        id: 3,
        secret: "secret02",
        title: "hey",
        url: "uri3",
      },
    ];

    component.update(<Gallery data={data} />);

    expect(component.root.findAllByType(NoImages).length).toEqual(0);

    // comprobamos si toda la data se esta renderizando de una manera correcta
    expect(component.root.findAllByType(Image).length).toEqual(data.length);

    expect(component.root.findAllByType(Image)[0].props.alt).toEqual(
      data[0].title
    );
  });
});
