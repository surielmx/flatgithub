import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import { mode, createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
	xs: '0px',
	sm: '600px',
	md: '900px',
	lg: '1200px',
	xl: '1536px',
	'2xl': '1800px',
});

const config: ThemeConfig = {
	useSystemColorMode: false,
	initialColorMode: 'light',
};
const theme = extendTheme({
	breakpoints,
	styles: {
		global: (props: any) => ({
			body: {
				fontWeight: 400,
				color: mode('flatBlack300', 'flatBlack.50')(props),
				background: mode('#fafaff', 'gray.800')(props),
				height: '100vh',
			},
		}),
	},
	fonts: {
		heading: 'Montserrat',
		body: 'Source Sans Pro',
	},
	colors: {
		flatRed: {
			'0': '#ffdede',
			'50': '#ffbdbd',
			'100': '#ff9c9c',
			'200': '#ff8c8c',
			'300': '#ff7b7b',
			'400': '#ff6b6b',
			'500': '#ff5a5a',
			'600': '#e65151',
			'700': '#cc4848',
			'800': '#993636',
			'900': '#662424',
		},
		flatRed0: '#ffdede',
		flatRed50: '#ffbdbd',
		flatRed100: '#ff9c9c',
		flatRed200: '#ff8c8c',
		flatRed300: '#ff7b7b',
		flatRed400: '#ff6b6b',
		flatRed500: '#ff5a5a',
		flatRed600: '#e65151',
		flatRed700: '#cc4848',
		flatRed800: '#993636',
		flatRed900: '#662424',
		flatBlack: {
			'0': '#d2d2d4',
			'50': '#a6a6a9',
			'100': '#79797e',
			'200': '#636369',
			'300': '#4d4d53',
			'400': '#36363e',
			'500': '#202028',
			'600': '#202326',
			'700': '#1d1f22',
			'800': '#191b1d',
			'900': '#121415',
		},
		flatBlack0: '#d2d2d4',
		flatBlack50: '#a6a6a9',
		flatBlack100: '#79797e',
		flatBlack200: '#636369',
		flatBlack300: '#4d4d53',
		flatBlack400: '#36363e',
		flatBlack500: '#202028',
		flatBlack600: '#202326',
		flatBlack700: '#1d1f22',
		flatBlack800: '#191b1d',
		flatBlack900: '#121415',
		flatGreen: {
			'0': '#ccefeb',
			'50': '#99dfd7',
			'100': '#66cfc2',
			'200': '#4dc7b8',
			'300': '#33bfae',
			'400': '#1ab7a4',
			'500': '#00af9a',
			'600': '#009e8b',
			'700': '#008c7b',
			'800': '#00695c',
			'900': '#00463e',
		},
		flatGreen0: '#ccefeb',
		flatGreen50: '#99dfd7',
		flatGreen100: '#66cfc2',
		flatGreen200: '#4dc7b8',
		flatGreen300: '#33bfae',
		flatGreen400: '#1ab7a4',
		flatGreen500: '#00af9a',
		flatGreen600: '#009e8b',
		flatGreen700: '#008c7b',
		flatGreen800: '#00695c',
		flatGreen900: '#00463e',
	},
	shadows: {
		outline: '0 0 0 3px #00463e',
	},
	components: {
		Heading: {
			baseStyle: {
				fontWeight: '600',
			},

			variants: {
				h1: {
					fontSize: '7xl',
					lineHeight: 1,
				},
				h2: {
					fontSize: '6xl',
				},
				h3: {
					fontSize: '5xl',
				},
				h4: {
					fontSize: '4xl',
				},
				h5: {
					fontSize: '3xl',
				},
				h6: {
					fontSize: 'xl',
				},
			},
		},
		Text: {
			baseStyle: {
				fontSize: '1.25rem',
				fontWeight: '400',
			},
		},
		Radio: {
			sizes: {
				lg: {
					control: { w: 6, h: 6 },
				},
			},
			defaultProps: {
				colorScheme: 'flatRed',
			},
		},
	},
	config,
});
export default theme;
