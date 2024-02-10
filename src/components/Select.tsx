import styled from "styled-components";
import { PropsWithChildren, createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

interface SelectProps {
	target: string;
	onTargetChange: (value: string) => void;
}

interface SelectContextType extends SelectProps {
	isOpen: boolean;
	onToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectContext = createContext<SelectContextType | null>(null);

const useSelectContext = () => {
	const context = useContext(SelectContext);

	if (!context) {
		throw Error("Error Occured in useSelectContext");
	}

	return context;
};

interface SelectRootProps extends PropsWithChildren, SelectProps {}

export function Select({ children, target, onTargetChange }: SelectRootProps) {
	const [isOpen, onToggle] = useState(false);
	const selectRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onToggle(false);
			}
		};

		const handleOutsideClick = (event: MouseEvent) => {
			if (!selectRef.current) return;
			if (!selectRef.current.contains(event.target as Node)) {
				onToggle(false);
			}
		};

		document.addEventListener("click", handleOutsideClick);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("click", handleOutsideClick);
			document.removeEventListener("keydown", handleEscape);
		};
	}, []);

	useEffect(() => {
		const handleTab = (event: KeyboardEvent) => {
			if (isOpen && event.key === "Tab") {
				onToggle(false);
			}
		};

		document.addEventListener("keydown", handleTab);

		return () => document.removeEventListener("keydown", handleTab);
	}, [isOpen]);

	return (
		<SelectContext.Provider value={{ isOpen, onToggle, target, onTargetChange }}>
			<StyledSelect ref={selectRef}>{children}</StyledSelect>
		</SelectContext.Provider>
	);
}

function SelectTrigger({ children }: PropsWithChildren) {
	const { isOpen, onToggle } = useSelectContext();

	const handleClick = () => onToggle((prev) => !prev);

	return (
		<StyledSelectTrigger onClick={handleClick}>
			<p>{children}</p>
			{isOpen ? <FaCaretUp /> : <FaCaretDown />}
		</StyledSelectTrigger>
	);
}

interface SelectContentContextType {
	activeItem: string;
	contentRef: React.RefObject<HTMLUListElement>;
}

const SelectContentContext = createContext<SelectContentContextType | null>(null);

const useSelectContentContext = () => {
	const context = useContext(SelectContentContext);

	if (!context) {
		throw Error("Error Occured in useSelectContentContext");
	}

	return context;
};

function SelectContent({ children }: PropsWithChildren) {
	const [activeItem, onActiveItemChange] = useState("");
	const { isOpen, onToggle, target, onTargetChange } = useSelectContext();
	const contentRef = useRef<HTMLUListElement>(null);

	const getOptions = () => {
		if (!contentRef.current) return;

		return Array.from(contentRef.current.childNodes).map((child) => {
			if (child.nodeType === Node.ELEMENT_NODE) {
				const element = child as HTMLElement;

				return element.dataset.label;
			}

			return "";
		});
	};

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			const list = getOptions();
			if (!list) return;

			const targetIndex = list.indexOf(activeItem);
			let nextTargetIndex = 0;

			if (event.key === "ArrowDown") {
				nextTargetIndex = targetIndex === list.length - 1 ? 0 : targetIndex + 1;
				onActiveItemChange(list[nextTargetIndex] as string);
			} else if (event.key === "ArrowUp") {
				nextTargetIndex = targetIndex === 0 ? list.length - 1 : targetIndex - 1;
				onActiveItemChange(list[nextTargetIndex] as string);
			} else if (event.key === "Enter") {
				event.preventDefault();
				onTargetChange(activeItem);
				onToggle(false);
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [activeItem]);

	useEffect(() => {
		if (isOpen) {
			onActiveItemChange(target);
		}
	}, [isOpen, target]);

	return (
		<>
			{isOpen ? (
				<SelectContentContext.Provider value={{ activeItem, contentRef }}>
					<StyledSelectContent role="listbox" ref={contentRef}>
						{children}
					</StyledSelectContent>
				</SelectContentContext.Provider>
			) : null}
		</>
	);
}

interface SelectOptionProps extends PropsWithChildren {
	label: string;
}

function SelectOption({ children, label }: SelectOptionProps) {
	const { target, onTargetChange, onToggle } = useSelectContext();
	const { activeItem } = useSelectContentContext();

	const onClick = useCallback(() => {
		onTargetChange(label);
		onToggle(false);
	}, [label]);

	return (
		<StyledSelectOption
			role="option"
			className={`${target === label ? "selected" : ""} ${activeItem === label ? "active" : ""}`}
			data-label={label}
			onClick={onClick}
		>
			{children}
		</StyledSelectOption>
	);
}

Select.Trigger = SelectTrigger;
Select.Content = SelectContent;
Select.Option = SelectOption;

const StyledSelect = styled.div`
	width: 100%;
	position: relative;
`;

const StyledSelectTrigger = styled.button`
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 10px 15px;
	font-size: 16px;
	border-radius: 5px;
	border: 1px solid ${({ theme }) => theme.colors.green500};
	background-color: ${({ theme }) => theme.colors.white};
	cursor: pointer;
`;

const StyledSelectContent = styled.ul`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	max-height: 200px;
	overflow: auto;
	border-radius: 5px;
	background: ${({ theme }) => theme.colors.white};
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	z-index: 1;
`;

const StyledSelectOption = styled.li`
	padding: 10px 15px;
	cursor: pointer;
	&.active {
		background-color: ${({ theme }) => theme.colors.gray200};
	}
	&:hover {
		background-color: ${({ theme }) => theme.colors.gray050};
	}
	&.selected {
		background-color: ${({ theme }) => theme.colors.green500};
		color: ${({ theme }) => theme.colors.white};
		&:hover,
		&.active {
			background-color: ${({ theme }) => theme.colors.green700};
		}
	}
`;
