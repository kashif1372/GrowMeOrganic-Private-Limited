import React, { useState } from "react";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface Department {
  department: string;
  sub_departments: string[];
}

const jsonData: Department[] = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

function Component2(): JSX.Element {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelect = (event: React.MouseEvent, item: string) => {
    event.preventDefault();
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }

    const department = jsonData.find((data) => data.department === item);
    if (department) {
      if (
        department.sub_departments.every((subDept) =>
          selectedItems.includes(subDept)
        )
      ) {
        setSelectedItems((prevSelectedItems) =>
          prevSelectedItems.filter(
            (i) => !department.sub_departments.includes(i)
          )
        );
      } else {
        setSelectedItems((prevSelectedItems) => [
          ...prevSelectedItems,
          ...department.sub_departments,
        ]);
      }
    }
  };

  return (
    <>
      <h2 style={{ display: "flex", justifyContent: "center" }}>Component-2</h2>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TreeView
          defaultCollapseIcon={<RemoveIcon />}
          defaultExpandIcon={<AddIcon />}
        >
          {jsonData.map((data) => (
            <DepartmentTreeItem
              key={data.department}
              nodes={data}
              selectedItems={selectedItems}
              handleSelect={handleSelect}
            />
          ))}
        </TreeView>
      </div>
    </>
  );
}

function DepartmentTreeItem({
  nodes,
  selectedItems,
  handleSelect,
}: {
  nodes: Department;
  selectedItems: string[];
  handleSelect: (event: React.MouseEvent, item: string) => void;
}) {
  const isAllSubDepartmentsSelected = nodes.sub_departments.every((subDept) =>
    selectedItems.includes(subDept)
  );

  const treeItemStyle = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  };

  const checkboxStyle = {
    marginRight: "8px",
    fontWeight: isAllSubDepartmentsSelected ? "bold" : "normal",
    color: isAllSubDepartmentsSelected ? "blue" : "inherit",
  };

  return (
    <TreeItem
      key={nodes.department}
      nodeId={nodes.department}
      label={
        <div style={treeItemStyle}>
          <span
            style={checkboxStyle}
            onClick={(e) => handleSelect(e, nodes.department)}
          >
            {isAllSubDepartmentsSelected ? (
              <CheckBoxIcon />
            ) : (
              <CheckBoxOutlineBlankIcon />
            )}
          </span>
          {nodes.department}
        </div>
      }
    >
      {nodes.sub_departments.map((subDept) => (
        <TreeItem
          key={subDept}
          nodeId={subDept}
          label={
            <div style={treeItemStyle}>
              <span
                style={{
                  ...checkboxStyle,
                  fontWeight: selectedItems.includes(subDept)
                    ? "bold"
                    : "normal",
                  color: selectedItems.includes(subDept) ? "blue" : "inherit",
                }}
                onClick={(e) => handleSelect(e, subDept)}
              >
                {selectedItems.includes(subDept) ? (
                  <CheckBoxIcon />
                ) : (
                  <CheckBoxOutlineBlankIcon />
                )}
              </span>
              {subDept}
            </div>
          }
        />
      ))}
    </TreeItem>
  );
}

export default Component2;
