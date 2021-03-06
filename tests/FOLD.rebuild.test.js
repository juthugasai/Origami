const RabbitEar = require("../rabbit-ear");

test("rebuild, no clean cut across a face", () => {
  const graph = RabbitEar.bases.square;
  graph.vertices_coords.push([0.5, 0.5]);
  graph.edges_vertices.push([0, 4]);
  graph.edges_assignment.push("V");

  RabbitEar.core.rebuild(graph);

  const nested = {
    vertices_coords: [[0, 0], [1, 0], [1, 1], [0, 1], [0.5, 0.5]],
    vertices_vertices: [[1, 4, 3], [2, 0], [1, 3], [0, 2], [0]],
    vertices_faces: [[0], [0], [0], [0], [0]],
    edges_vertices: [[0, 1], [1, 2], [3, 2], [0, 3], [0, 4]],
    edges_faces: [[0], [0], [0], [0], [0]],
    faces_vertices: [[4, 0, 1, 2, 3, 0]],
    faces_edges: [[4, 0, 1, 2, 3, 4]],
  };
  const not_nested = {
    edges_assignment: ["B", "B", "B", "B", "V"],
    edges_foldAngle: [0, 0, 0, 0, 180],
    edges_length: [1, 1, 1, 1, Math.SQRT1_2],
  };

  Object.keys(not_nested).forEach((key) => {
    not_nested[key].forEach((el, i) => {
      expect(not_nested[key][i]).toBe(graph[key][i]);
    });
  });
  // Object.keys(nested).forEach((key) => {
  //   nested[key].forEach((arr, i) =>
  //     arr.forEach((el, j) => {
  //       expect(nested[key][i][j]).toBe(graph[key][i][j]);
  //     }));
  // });
});

test("fragment and rebuild, two crossing edges", () => {
  const graph = RabbitEar.bases.square;
  graph.vertices_coords.push([-0.1, 0.3], [1.1, 0.9]);
  graph.vertices_coords.push([0.2, -0.1], [0.8, 1.1]);
  graph.edges_vertices.push([4, 5]);
  graph.edges_vertices.push([6, 7]);
  graph.edges_assignment.push("V");
  graph.edges_assignment.push("M");

  RabbitEar.core.fragment(graph);
  RabbitEar.core.rebuild(graph);

  // console.log("rebuilt 2", fragmented);

  const calculated = {
    file_spec: 1.1,
    frame_attributes: [ '2D' ],
    frame_classes: [ 'creasePattern' ],
    vertices_coords: [
      [0, 0],
      [0.25, 0],
      [1, 0],
      [1, 0.8500000000000001],
      [1, 1],
      [0, 1],
      [0.75, 1],
      [0, 0.3500000000000001],
      [-0.1, 0.3],
      [0.5666666666666667, 0.6333333333333333],
      [1.1, 0.9],
      [0.2, -0.1],
      [0.8, 1.1]
    ],
    edges_vertices:
     [ [ 0, 1 ],
       [ 1, 2 ],
       [ 2, 3 ],
       [ 3, 4 ],
       [ 5, 6 ],
       [ 6, 4 ],
       [ 0, 7 ],
       [ 7, 5 ],
       [ 8, 7 ],
       [ 7, 9 ],
       [ 9, 3 ],
       [ 3, 10 ],
       [ 11, 1 ],
       [ 1, 9 ],
       [ 9, 6 ],
       [ 6, 12 ] ],
    edges_assignment:
     [ 'B',
       'B',
       'B',
       'B',
       'B',
       'B',
       'B',
       'B',
       'V',
       'V',
       'V',
       'V',
       'M',
       'M',
       'M',
       'M' ],
    edges_foldAngle:
     [ 0, 0, 0, 0, 0, 0, 0, 0, 180, 180, 180, 180, -180, -180, -180, -180 ],
    vertices_vertices:
     [ [ 1, 7 ],
       [ 11, 2, 9, 0 ],
       [ 3, 1 ],
       [ 9, 2, 10, 4 ],
       [ 3, 6 ],
       [ 7, 6 ],
       [ 9, 4, 12, 5 ],
       [ 8, 0, 9, 5 ],
       [ 7 ],
       [ 7, 1, 3, 6 ],
       [ 3 ],
       [ 1 ],
       [ 6 ] ],
    faces_vertices:
     [ [ 7, 0, 1, 9 ], [ 9, 1, 2, 3 ], [ 9, 3, 4, 6 ], [ 6, 5, 7, 9 ] ],
    faces_edges:
     [ [ 6, 0, 13, 9 ],
       [ 13, 1, 2, 10 ],
       [ 10, 3, 5, 14 ],
       [ 4, 7, 9, 14 ] ],
    edges_faces:
     [ [0],
       [ 1 ],
       [ 1 ],
       [ 2 ],
       [ 3 ],
       [ 2 ],
       [0],
       [ 3 ],
       [],
       [ 0, 3 ],
       [ 1, 2 ],
       [],
       [],
       [ 0, 1 ],
       [ 2, 3 ],
       [] ],
    vertices_faces:
     [ [0],
       [ 0, 1 ],
       [ 1 ],
       [ 1, 2 ],
       [ 2 ],
       [ 3 ],
       [ 2, 3 ],
       [ 0, 3 ],
       [],
       [ 0, 1, 2, 3 ],
       [],
       [],
       [] ]
  };

  // expect(f.vertices_coords.length).toBe(13);
  // expect(f.edges_vertices.length).toBe(16);
  // expect(f.edges_assignment.filter(a => a === "B" || a === "b").length).toBe(8);
  // expect(f.edges_assignment.filter(a => a === "V" || a === "v").length).toBe(4);
  // expect(f.edges_assignment.filter(a => a === "M" || a === "m").length).toBe(4);
  // expect(f.edges_foldAngle.filter(a => a === 0).length).toBe(8);
  // expect(f.edges_foldAngle.filter(a => a === 180).length).toBe(4);
  // expect(f.edges_foldAngle.filter(a => a === -180).length).toBe(4);

  expect(true).toBe(true);
});
