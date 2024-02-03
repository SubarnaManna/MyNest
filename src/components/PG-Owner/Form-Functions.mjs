

export const Id = (e)=> {return document.getElementById(e)};

export const clearRadioButtons = (name)=>{
  // Get all radio buttons with the specified name
  var radioButtons = document.getElementsByName(name);

  // Loop through each radio button and set the checked property to false
  for (var i = 0; i < radioButtons.length; i++) {
    radioButtons[i].checked = false;
  }
}

export function clearImageInput(FileInputId) {
  // Get the file input element by its ID
  var fileInput = document.getElementById(FileInputId);

  // Create a new input element
  var newFileInput = document.createElement("input");
  newFileInput.type = "file";
  newFileInput.id = FileInputId;
  newFileInput.accept = ".jpg, .png, .jpeg, .avif, .webp ";

  // Replace the old input with the new one
  fileInput.parentNode.replaceChild(newFileInput, fileInput);

  // Remove the new input element (optional, but it's good practice)
  newFileInput.remove();
}

export function clearDropdown(id) {
    var dropdown = document.getElementById(id);
    dropdown.selectedIndex = -1;
    // dropdown.innerHTML = ''; // Removes all options
}
