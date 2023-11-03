import { IconButton, Stack, Typography } from "@mui/material";
import Iconify from "./iconify";
import { uniqueId } from "lodash";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { toast } from "react-toastify";
import studentStore from "src/store/studentStore";

const AnnotateButton = forwardRef(
  ({ questionId, parentId, onClickHighlightedRow }, ref) => {
    const { setAnnotate, getSessionQuestion } = studentStore();

    useEffect(() => {
      var question = getSessionQuestion(questionId);
      if (question == null) return;
      question.annotate.map((x) => {
        highlightHelper(x, true);
      });
    }, [questionId]);

    useImperativeHandle(ref, () => ({
      unhighlightText() {
        removeHighlight("test-highlighted-text-hover");
      },
      removeAllHighlights() {
        var highlights = document.getElementsByClassName(
          "test-highlighted-text"
        );
        var highlightsByGroup = Object.groupBy(
          highlights,
          ({ className }) => className
        );
        Object.keys(highlightsByGroup).map((x) => removeHighlight(x));
      },
    }));

    const removeHighlight = (className) => {
      var highlights = document.getElementsByClassName(className);
      var temp = [];
      temp.push(highlights.item(0).previousSibling);
      for (var i = 0; i < highlights.length; i++) {
        var node = highlights.item(i);
        if (i == 0) {
          // first
        } else if (i > 0 && i < highlights.length - 1) {
          // middle
          node.outerHTML = node.innerHTML;
          i--;
          continue;
        } else if (i == highlights.length - 1) {
          // last
        }
        temp.push(node);
      }
      temp.push(highlights.item(highlights.length - 1).nextSibling);
      // temp contains first and last highlight (with prev and next sibling)
      if (temp.length == 3) {
        // middle of a single tag
        temp[0].innerHTML =
          temp[0].innerText + temp[1].innerText + temp[2].innerText;
      } else if (temp.length == 4) {
        // multiple tags
        temp[0].innerHTML += temp[1].innerText;
        temp[3].innerHTML = temp[2].innerText + temp[3].innerText;
      }
      temp[1].remove();
      temp[2].remove();
    };

    const getTextNodesBetween = (rootNode, startNode, endNode) => {
      var pastStartNode = false,
        reachedEndNode = false,
        textNodes = [];
      textNodes.push(startNode);

      function getTextNodes(node) {
        if (node == startNode) {
          pastStartNode = true;
        } else if (node == endNode) {
          reachedEndNode = true;
        } else if (node.nodeType == 3) {
          if (
            pastStartNode &&
            !reachedEndNode &&
            !/^\s*$/.test(node.nodeValue)
          ) {
            textNodes.push(node);
          }
        } else {
          for (
            var i = 0, len = node.childNodes.length;
            !reachedEndNode && i < len;
            ++i
          ) {
            getTextNodes(node.childNodes[i]);
            if (node.childNodes[i] == endNode) {
              reachedEndNode = true;
              break;
            }
          }
        }
      }

      getTextNodes(rootNode);

      if (startNode != endNode) textNodes.push(endNode);
      return textNodes;
    };

    const unClickAllTexts = (id) => {
      var highlights = document.getElementsByClassName(
        "test-highlighted-text-hover"
      );
      for (var i = 0; i < highlights.length; i++) {
        var temp = highlights.item(i).className;
        if (temp.includes(id)) continue;
        temp = temp.replace(
          "test-highlighted-text-hover",
          "test-highlighted-text"
        );
        highlights.item(i).setAttribute("clicked", false);
        highlights.item(i).className = temp;
      }
    };

    const cloneSelection = (sel = document.getSelection()) => {
      const cloned = {};

      for (const p in sel) cloned[p] = sel[p];

      return cloned;
    };

    const highlightHelper = (select = null, isSaved = false) => {
      if (select == null) {
        var temp = document.getSelection();
        select = {
          anchorNode: temp.anchorNode,
          focusNode: temp.focusNode,
          anchorOffset: temp.anchorOffset,
          focusOffset: temp.focusOffset,
          rangeCount: 1,
        };
        temp.empty();
      }
      highlightText(select, isSaved);
    };

    const highlightText = (select, isSaved = false) => {
      var parent = document.getElementById(parentId);
      var selection = select;
      var selectionDup = cloneSelection(selection);
      if (selection.rangeCount > 0) {
        var textNodes = getTextNodesBetween(
          parent,
          selection.anchorNode,
          selection.focusNode
        );

        var len = textNodes.length;
        var id = uniqueId("highlited-text-");
        var selectedText = selection.toString();
        var anchorOffset = selection.anchorOffset;
        var focusOffset = selection.focusOffset;

        for (var i = 0; i < len; i++) {
          if (textNodes[i].parentNode == null) continue;
          if (textNodes[i].parentNode.parentNode == null) continue;
          if (textNodes[i].parentNode.parentNode.nodeName === "MARK") {
            toast.error("Text is already highlighted");
            selection.empty();
            return;
          }
        }

        textNodes.map((x, key) => {
          var node = x.parentNode;
          const mark = document.createElement("mark");
          mark.className = `test-highlighted-text ${id}`;
          mark.addEventListener("mouseenter", () => {
            var highlights = document.getElementsByClassName(id);
            for (var i = 0; i < highlights.length; i++) {
              highlights.item(
                i
              ).className = `test-highlighted-text-hover ${id}`;
            }
          });
          mark.addEventListener("mouseleave", () => {
            var highlights = document.getElementsByClassName(id);
            for (var i = 0; i < highlights.length; i++) {
              if (highlights.item(i).getAttribute("clicked")) continue;
              highlights.item(i).className = `test-highlighted-text ${id}`;
            }
          });
          mark.addEventListener("click", () => {
            unClickAllTexts(id);
            var highlights = document.getElementsByClassName(id);
            for (var i = 0; i < highlights.length; i++) {
              highlights.item(i).setAttribute("clicked", true);
            }
            onClickHighlightedRow(selectedText, id);
          });
          if (key == 0) {
            var dupNode = node.cloneNode(true);
            var dupNode2 = node.cloneNode(true);
            dupNode2.innerHTML = "";
            var text = node.innerHTML;

            node.innerHTML = text.substring(0, anchorOffset);
            dupNode.innerHTML = text.substring(anchorOffset, text.length);

            if (key + 1 == len) {
              // if this is the only selection
              dupNode.innerHTML = text.substring(anchorOffset, focusOffset);
              dupNode2.innerHTML = text.substring(focusOffset, text.length);
            }

            mark.innerHTML = dupNode.outerHTML;

            if (node.nextSibling == undefined) {
              node.parentNode.appendChild(mark);
              if (dupNode2.innerHTML != "")
                node.parentNode.appendChild(dupNode2);
            } else {
              if (dupNode2.innerHTML != "") {
                node.parentNode.insertBefore(dupNode2, node.nextSibling);
                node.parentNode.insertBefore(mark, dupNode2);
              } else {
                node.parentNode.insertBefore(mark, node.nextSibling);
              }
            }
          } else if (key > 0 && key < len - 1) {
            mark.innerHTML = node.outerHTML;
            node.parentNode.replaceChild(mark, node);
          } else if (key == len - 1) {
            var dupNode = node.cloneNode(true);
            var text = node.innerHTML;
            dupNode.innerHTML = text.substring(0, focusOffset);
            node.innerHTML = text.substring(focusOffset, text.length);
            mark.innerHTML = dupNode.outerHTML;

            node.parentNode.insertBefore(mark, node);
          }
        });
        if (!isSaved) setAnnotate(questionId, selectionDup);
      }
    };

    return (
      <IconButton onClick={() => highlightHelper()}>
        <Stack alignItems={"center"} spacing={1}>
          <Iconify icon={"lucide:pencil-line"} />
          <Typography variant={"caption"}>Annotate</Typography>
        </Stack>
      </IconButton>
    );
  }
);

export default AnnotateButton;
