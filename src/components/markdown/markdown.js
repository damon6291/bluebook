import PropTypes from "prop-types";
// utils
import "src/utils/highlight";
import ReactMarkdown from "react-markdown";
// markdown plugins
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
// @mui
import Link from "@mui/material/Link";
// routes
import { RouterLink } from "src/routes/components";
//
import Image from "../image";
//
import StyledMarkdown from "./styles";
import { useEffect } from "react";
import { useBoolean } from "src/hooks/use-boolean";

// ----------------------------------------------------------------------

export default function Markdown({ sx, children, ...other }) {
  const refresh = useBoolean(false);

  useEffect(() => {
    refresh.onTrue();
    setTimeout(() => {
      refresh.onFalse();
    }, 1);
  }, [children]);

  return (
    <StyledMarkdown
      sx={{
        ...sx,
        "& p": {
          fontSize: "20px",
        },
        "& li, ol": {
          typography: "body2",
        },
        "& ol": {
          p: 0,
          display: { md: "flex" },
          listStyleType: "none",
          "& li": {
            "&:first-of-type": {
              minWidth: 240,
              mb: { xs: 0.5, md: 0 },
            },
          },
        },
      }}
    >
      {refresh.value ? null : (
        <ReactMarkdown
          rehypePlugins={[
            rehypeRaw,
            rehypeHighlight,
            [remarkGfm, { singleTilde: false }],
          ]}
          components={components}
          children={children}
          {...other}
        />
      )}
    </StyledMarkdown>
  );
}

Markdown.propTypes = {
  sx: PropTypes.object,
};

// ----------------------------------------------------------------------

const components = {
  p: ({ ...props }) => (
    <p>
      {props.children.map((x, key) => {
        if (typeof x == "string")
          return (
            // <span id={`${x}${key}`} key={key}>
            <span>{x}</span>
          );
        else {
          return x;
        }
      })}
    </p>
  ),
  img: ({ ...props }) => (
    <Image alt={props.alt} ratio="16/9" sx={{ borderRadius: 2 }} {...props} />
  ),
  a: ({ ...props }) => {
    const isHttp = props.href.includes("http");

    return isHttp ? (
      <Link target="_blank" rel="noopener" {...props} />
    ) : (
      <Link component={RouterLink} href={props.href} {...props}>
        {props.children}
      </Link>
    );
  },
};
