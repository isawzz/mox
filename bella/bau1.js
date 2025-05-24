

function unhighlightAll() {
  if (DA.pathHighlighted) {
    DA.pathHighlighted.forEach(i => DA.polygons[i].classList.remove('highlight'));
  } else if (DA.firstSelected !== null) {
    DA.polygons[DA.firstSelected].classList.remove('highlight');
  }
  DA.firstSelected = null;
  DA.pathHighlighted = null;
}

function highlightPath(path) {
  path.forEach(i => DA.polygons[i].classList.add('highlight'));
  DA.pathHighlighted = path;
}

// shortestFacePath function from previous answer here

function onPolygonClick(clickedIndex) {
  if (DA.firstSelected === null) {
    // No selection yet, highlight clicked polygon
    DA.firstSelected = clickedIndex;
    DA.polygons[clickedIndex].classList.add('highlight');
  } else if (DA.pathHighlighted === null) {
    // One polygon selected, highlight path from DA.firstSelected to clickedIndex
    if (clickedIndex === DA.firstSelected) {
      // Clicked same polygon again: maybe do nothing or unselect
      return;
    }
    const path = shortestFacePath(neighbors, DA.firstSelected, clickedIndex);
    if (path) {
      // Remove highlight from DA.firstSelected only
      DA.polygons[DA.firstSelected].classList.remove('highlight');
      highlightPath(path);
    } else {
      // No path found, maybe alert or ignore
      console.log('No path found');
    }
  } else {
    // Path is highlighted, unhighlight everything and start over
    unhighlightAll();
    DA.firstSelected = clickedIndex;
    DA.polygons[clickedIndex].classList.add('highlight');
  }
}


