import {tags as t} from '@lezer/highlight';
import {createTheme} from 'thememirror';

// Author: unknown
export const thunderclap = createTheme({
	variant: 'dark',
	settings: {
		background: '#151719',
		foreground: '#c1ccd7',
		caret: '#449377',
		selection: '#35363b',
		lineHighlight: '#8a91991a',
		gutterBackground: '#151719',
		gutterForeground: '#8a919966',
	},
    styles: [
		{
			tag: t.comment,
			color: '#787b8099',
		},
		{
			tag: [t.string, t.regexp, t.special(t.brace)],
			color: '#5C81B3',
		},
		{
			tag: t.number,
			color: '#C1E1B8',
		},
		{
			tag: t.bool,
			color: '#53667D',
		},
		{
			tag: [t.definitionKeyword, t.modifier, t.function(t.propertyName)],
			color: '#A3D295',
			fontWeight: 'bold',
		},
		{
			tag: [t.keyword, t.moduleKeyword, t.operatorKeyword, t.operator],
			color: '#449377',
			fontWeight: 'bold',
		},
		{
			tag: [t.variableName, t.attributeName],
			color: '#449377',
		},
		{
			tag: [
				t.function(t.variableName),
				t.definition(t.propertyName),
				t.derefOperator,
			],
			color: '#fff',
		},
		{
			tag: t.tagName,
			color: '#A3D295',
		},
	],
});