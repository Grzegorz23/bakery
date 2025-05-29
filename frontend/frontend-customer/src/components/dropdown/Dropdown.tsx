import React, {type ReactElement} from "react";
import "./Dropdown.css"

type DropdownType = {
    dropdown_text: string;
    menu: ReactElement[]
}

export function Dropdown (dropdownType: DropdownType) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <div className="dropdown">
            {React.cloneElement(
                <button id="dropdown-trigger-button">{dropdownType.dropdown_text}</button>,
                {
                    onClick: handleOpen,
                } as React.ButtonHTMLAttributes<HTMLButtonElement>
            )}
            {open ? (
                <ul className="menu">
                    {dropdownType.menu.map((menuItem, index) => {
                        const element = menuItem as React.ReactElement<any>;
                        return (
                            <li key={index} className="menu-item">
                                {React.cloneElement(element, {
                                    onClick: (event: React.MouseEvent) => {
                                        if (element.props.onClick) {
                                            element.props.onClick();
                                        }
                                        const text = (event.currentTarget as HTMLElement).textContent;
                                        const triggerBtn = document.getElementById("dropdown-trigger-button");
                                        if (triggerBtn) {
                                            triggerBtn.textContent = text;
                                        }
                                        setOpen(false);
                                    },
                                })}
                            </li>
                        );
                    })}
                </ul>
            ) : null}
        </div>
    );
};