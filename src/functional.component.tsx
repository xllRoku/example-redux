import React from "react";

interface IProps {
	predicate: boolean | undefined | string | unknown;
	children: React.ReactNode;
}

interface IWhenProps {
	children: React.ReactNode;
	predicate: boolean | string | undefined;
}

const If: React.FC<IProps> = ({ predicate, children }) => {
	const childrenArray = React.Children.toArray(children);

	return (
		<>
			{childrenArray.map((child) => {
				return React.cloneElement(child as React.ReactElement, {
					predicate,
				});
			})}
		</>
	);
};

const Else: React.FC<IProps> = ({ predicate, children }) => {
	return !predicate ? <> {children} </> : <></>;
};

const Then: React.FC<IProps> = ({ predicate, children }) => {
	return predicate ? <> {children} </> : <></>;
};

const When: React.FC<IWhenProps> = ({ children, predicate }) => {
	return !predicate ? <></> : <>{children}</>;
};

export { Else, If, Then, When };
