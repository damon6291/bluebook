import PropTypes from "prop-types";
import "src/utils/highlight";
import ReactQuill from "react-quill";
// @mui
import { alpha } from "@mui/material/styles";
//
import { StyledEditor } from "./styles";
import Toolbar, { formats } from "./toolbar";

import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import katex from "katex";
import "katex/dist/katex.min.css";

// ----------------------------------------------------------------------

const editorOptions = {
  buttonList: [
    ["undo", "redo"],
    ["bold", "underline", "italic"],
    ["fontColor", "hiliteColor"],
    ["align", "horizontalRule", "list"],
    ["table", "image"],
    ["math"],
  ],
  katex: katex,
  imageRotation: false,
};

export default function Editor({
  id = "damon-quill",
  error,
  simple = false,
  helperText,
  sx,
  ...other
}) {
  const modules = {
    toolbar: {
      container: `#${id}`,
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true,
    },
    syntax: true,
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <>
      <SunEditor
        setOptions={editorOptions}
        lang="en"
        // onImageUploadError={onImageUploadError}
        placeholder="Write something awesome..."
        height="200px"
        setDefaultStyle="font-size: 20px"
        {...other}
      />
    </>
  );

  return (
    <>
      <StyledEditor
        sx={{
          ...(error && {
            border: (theme) => `solid 1px ${theme.palette.error.main}`,
            "& .ql-editor": {
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
            },
          }),
          ...sx,
        }}
      >
        <Toolbar id={id} isSimple={simple} />

        <ReactQuill
          modules={modules}
          formats={formats}
          placeholder="Write something awesome..."
          {...other}
        />
      </StyledEditor>

      {helperText && helperText}
    </>
  );
}

Editor.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.object,
  id: PropTypes.string,
  simple: PropTypes.bool,
  sx: PropTypes.object,
};
