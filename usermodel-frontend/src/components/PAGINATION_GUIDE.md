# Enhanced Pagination Component

## Overview
The `Pagination` component is a reusable, flexible pagination control with navigation buttons and input-based page jumping functionality.

## Features
- **Previous/Next Buttons** - Navigate between pages
- **Page Information Display** - Shows current page and total pages
- **Input-Based Navigation** - Jump directly to a specific page number
- **Error Handling** - Validates page numbers and provides user feedback
- **Keyboard Support** - Press Enter to jump to a page
- **Responsive Design** - Works seamlessly on all screen sizes
- **Accessible** - Proper labels, disabled states, and ARIA support

## Props

| Prop             | Type     | Required | Default | Description                                          |
|------------------|----------|----------|---------|------------------------------------------------------|
| `currentPage`    | number   | Yes      | -       | The current active page number                       |
| `totalPages`     | number   | Yes      | -       | Total number of pages                                |
| `onPageChange`   | function | Yes      | -       | Callback function triggered when page changes        |
| `itemsPerPage`   | number   | No       | 5       | Number of items displayed per page (for info text)   |

## Usage Example

### Basic Implementation

```jsx
import Pagination from "../components/Pagination";

const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <>
      {/* Your content here */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};
```

### With Dynamic Data

```jsx
import React, { useState } from "react";
import Pagination from "../components/Pagination";

const DataList = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      {/* Render current items */}
      <div>
        {currentItems.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>

      {/* Pagination controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
};

export default DataList;
```

### In ManageUsers Context

```jsx
// State management
const [currentPage, setCurrentPage] = useState(1);
const usersPerPage = 5;

// Calculate pagination
const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;
const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

// Reset to page 1 when filters change
useEffect(() => {
  setCurrentPage(1);
}, [search, statusFilter, roleFilter]);

// Render
return (
  <>
    {/* Table content */}
    <table>
      {/* ... */}
    </table>

    {/* Pagination component */}
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      itemsPerPage={usersPerPage}
    />
  </>
);
```

## Component Sections

### 1. Navigation Buttons
- **Previous Button**: Goes to page (currentPage - 1)
  - Disabled when currentPage = 1
  - Shows chevron icon
  
- **Next Button**: Goes to page (currentPage + 1)
  - Disabled when currentPage = totalPages
  - Shows chevron icon

### 2. Page Information Display
Shows current page number and total pages in the format:
```
Page 1 of 10
```

### 3. Input-Based Navigation
Users can:
- Type a page number directly
- Press Enter to jump to that page
- Click the "Go" button to navigate
- See validation messages for invalid entries

#### Validation Rules
- Page number must be between 1 and totalPages
- Must be a valid integer
- Cannot navigate to the current page
- Empty input disables the "Go" button

### 4. Results Information
Displays items per page information at the bottom

## Styling

The component uses Tailwind CSS with the following design:

- **Colors**:
  - Primary buttons: Blue (#3B82F6 / hover: #2563EB)
  - Jump button: Green (#22C55E / hover: #16A34A)
  - Disabled state: Gray (#D3D3D3)

- **Spacing**:
  - Button padding: 0.625rem y, 1.5rem x
  - Gap between sections: 1rem
  - Container padding: 1rem
  - Top margin: 2rem

- **Borders & Radius**:
  - Buttons: rounded-lg
  - Input: rounded-lg
  - Container: rounded-lg with shadow

- **Typography**:
  - Buttons: semibold
  - Labels: small, semibold
  - Page numbers: large, semibold, blue

## Keyboard Shortcuts

| Key   | Action                    |
|-------|---------------------------|
| Enter | Jump to page (in input)   |

## Accessibility Features

- All buttons have proper `disabled` attributes
- Input field has associated `label` element
- Focus states are visible with ring styles
- Keyboard navigation supported
- Error messages for user guidance
- Proper contrast ratios for readability

## Error Handling

The component validates input and shows alerts for:

```
// Invalid page number
"Please enter a valid page number between 1 and {totalPages}"

// Scenarios that trigger validation:
- Entering a number less than 1
- Entering a number greater than totalPages
- Entering a non-numeric value
- Attempting to navigate to the current page
- Leaving the input empty and clicking "Go"
```

## Performance Considerations

- No unnecessary re-renders
- Input is cleared after successful navigation
- Validation is done before state updates
- Event handlers are optimized

## Integration Tips

1. **Reset pagination when filters change**:
   ```jsx
   useEffect(() => {
     setCurrentPage(1);
   }, [searchTerm, filters]);
   ```

2. **Calculate pagination before rendering**:
   ```jsx
   const totalPages = Math.ceil(items.length / itemsPerPage);
   ```

3. **Always provide valid props**:
   ```jsx
   <Pagination
     currentPage={currentPage}
     totalPages={Math.max(1, totalPages)} // Ensure minimum of 1
     onPageChange={setCurrentPage}
   />
   ```

4. **Handle edge cases**:
   - Empty data lists
   - Single page (totalPages = 1)
   - Large datasets

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

All features use standard HTML and CSS, ensuring broad compatibility.

## Future Enhancement Possibilities

- Add page size selector (items per page)
- Add "Go to first/last page" buttons
- Display visible item range (e.g., "Showing 1-10 of 100")
- Add loading states during data fetching
- Customizable button text and labels
- Different pagination styles (dots, dots+text, text only)
