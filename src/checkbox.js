import './checkbox.css';
import { Form } from 'react-bootstrap';

export const Checkbox = ({ label, type, onChecked, checked }) => {
  return (
    <Form>
      <Form.Switch
        onChange={(e) => onChecked(type, e.target.checked)}
        id={label}
        label={label}
        checked={checked}
      />
    </Form>
  );
};
