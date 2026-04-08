# Standardized Form Design Guide

## Overview
All forms across the application follow a consistent and unified UI pattern to ensure a cohesive user experience.

## Form Components

### 1. **FormInput**
Standardized text input component with built-in label, validation, and focus states.

**Props:**
- `label` - Field label text
- `type` - Input type (text, email, password, etc.) - default: "text"
- `name` - Field name for form handling
- `placeholder` - Placeholder text
- `value` - Current input value
- `onChange` - Change handler function
- `required` - Whether field is required - default: false
- `disabled` - Disable the input - default: false

**Usage:**
```jsx
<FormInput
  label="Email Address"
  type="email"
  name="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
/>
```

### 2. **FormSelect**
Standardized dropdown/select component with consistent styling.

**Props:**
- `label` - Field label text
- `name` - Field name for form handling
- `value` - Current selected value
- `onChange` - Change handler function
- `options` - Array of options with format: `[{value: '', label: ''}, ...]`
- `required` - Whether field is required - default: false
- `disabled` - Disable the select - default: false

**Usage:**
```jsx
const roleOptions = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" }
];

<FormSelect
  label="Role"
  name="role"
  value={role}
  onChange={handleChange}
  options={roleOptions}
  required
/>
```

### 3. **FormButton**
Standardized button component with multiple variants and loading states.

**Props:**
- `type` - Button type (submit, button, reset) - default: "submit"
- `label` - Button text
- `onClick` - Click handler function
- `disabled` - Disable the button - default: false
- `loading` - Show loading state - default: false
- `variant` - Button style variant: "primary" | "secondary" | "danger" | "success" - default: "primary"
- `className` - Additional CSS classes

**Available Variants:**
- **primary** - Blue background, used for main actions (submit, create, etc.)
- **secondary** - Gray background, used for secondary actions (cancel, reset, etc.)
- **danger** - Red background, used for destructive actions (delete, etc.)
- **success** - Green background, used for success actions (confirm, etc.)

**Usage:**
```jsx
<FormButton
  type="submit"
  label="Create User"
  loading={isLoading}
  variant="primary"
  className="w-full"
/>

<FormButton
  type="button"
  label="Cancel"
  onClick={handleCancel}
  variant="secondary"
/>
```

### 4. **FormContainer**
Optional wrapper component for consistent form layout and styling.

**Props:**
- `title` - Form title/heading
- `children` - Form content
- `className` - Additional CSS classes

**Usage:**
```jsx
<FormContainer title="Login" className="space-y-4">
  {/* Form fields go here */}
</FormContainer>
```

## Design Specifications

### Colors
- **Primary**: Blue (#3B82F6)
- **Secondary**: Gray (#9CA3AF)
- **Danger**: Red (#EF4444)
- **Success**: Green (#22C55E)
- **Background**: Light Gray (#F3F4F6)

### Typography
- **Labels**: 14px, semibold, dark gray
- **Titles**: 24px, bold, dark gray
- **Input Text**: 16px, regular

### Spacing
- **Margin between fields**: 1.25rem (mb-5)
- **Form padding**: 2rem (p-8)
- **Border radius**: 0.5rem (rounded-lg) for inputs, 0.75rem (rounded-xl) for containers

### Focus States
- **Ring color**: Blue (#3B82F6)
- **Ring width**: 2px
- **Transition**: 200ms smooth transition

### Buttons
- **Padding**: 0.625rem top/bottom, 1.5rem left/right (px-6 py-2.5)
- **Border radius**: 0.5rem (rounded-lg)
- **Font weight**: Semibold
- **Transition**: 200ms smooth transition

## Implementation Examples

### Login Form
```jsx
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
import FormContainer from "../components/FormContainer";

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

<div className="min-h-screen flex items-center justify-center bg-gray-50">
  <FormContainer title="Login" className="space-y-4">
    <FormInput
      label="Email Address"
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <FormInput
      label="Password"
      type="password"
      placeholder="Enter your password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    <div className="pt-2">
      <FormButton
        type="submit"
        label="Login"
        onClick={handleSubmit}
        loading={loading}
        variant="primary"
        className="w-full"
      />
    </div>
  </FormContainer>
</div>
```

### Create User Form
```jsx
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import FormButton from "../components/FormButton";

const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  role: "user"
});

const roleOptions = [
  { value: "user", label: "User" },
  { value: "admin", label: "Admin" }
];

<form onSubmit={handleSubmit} className="space-y-4">
  <FormInput
    label="Name"
    type="text"
    name="name"
    placeholder="Enter Full Name"
    value={formData.name}
    onChange={handleChange}
    required
  />

  <FormInput
    label="Email"
    type="email"
    name="email"
    placeholder="Enter Email Address"
    value={formData.email}
    onChange={handleChange}
    required
  />

  <FormInput
    label="Password"
    type="password"
    name="password"
    placeholder="Enter Password"
    value={formData.password}
    onChange={handleChange}
    required
  />

  <FormSelect
    label="Role"
    name="role"
    value={formData.role}
    onChange={handleChange}
    options={roleOptions}
  />

  <FormButton
    type="submit"
    label="Create User"
    loading={loading}
    variant="primary"
    className="w-full"
  />
</form>
```

## Migration Checklist
When adding new forms to the application:
- [ ] Import `FormInput`, `FormSelect`, `FormButton` components
- [ ] Use `FormContainer` for consistent wrapper styling
- [ ] Replace all input fields with `FormInput` component
- [ ] Replace all select fields with `FormSelect` component
- [ ] Replace all buttons with `FormButton` component
- [ ] Ensure form spacing uses `className="space-y-4"`
- [ ] Test all form functionality and button interactions
- [ ] Verify responsive behavior on mobile devices

## Accessibility
- All form fields include proper `label` elements
- Required fields are marked with a red asterisk (*)
- Focus states are clearly visible with ring styles
- Buttons include appropriate `disabled` states
- Loading states prevent duplicate submissions
- Color is not the only indicator of status

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

All components use standard HTML and Tailwind CSS for maximum compatibility.
