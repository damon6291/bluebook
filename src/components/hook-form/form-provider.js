import PropTypes from "prop-types";
import { FormProvider as Form } from "react-hook-form";

// ----------------------------------------------------------------------

export default function FormProvider({
  children,
  onSubmit,
  methods,
  ...others
}) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} {...others}>
        {children}
      </form>
    </Form>
  );
}

FormProvider.propTypes = {
  children: PropTypes.node,
  methods: PropTypes.object,
  onSubmit: PropTypes.func,
};
