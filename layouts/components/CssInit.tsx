import { Helmet } from 'react-helmet-async'

const Index = () => {
	return (
		<Helmet>
			<style>{`
      html,
      body {
            margin: 0;
            padding: 0;
            background-color: var(--color_bg);
            color: var(--color_text);
            font-size: 14px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
                  'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
                  'Noto Color Emoji';
            line-height: 1.5;
      
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            scroll-behavior: smooth;
            text-rendering: optimizeLegibility;
            text-size-adjust: 100%;
      }
      
      ::-webkit-scrollbar-thumb {
            background-color: transparent;
      }
      
      ::-webkit-scrollbar {
            width: 0px;
            height: 0px;
      }
      
      ::-webkit-input-placeholder,
      .ant-select-selection-placeholder {
            color: var(--color_placeholder) !important;
      }
      
      input:-internal-autofill-previewed,
      input:-internal-autofill-selected {
            transition: background-color 5000000s ease-in-out 0s !important;
      
            -webkit-text-fill-color: transparent !important;
      }
      
      #nprogress {
            position: relative;
            z-index: 9999999;
      }
      
      #nprogress .bar {
            border-radius: 2px;
            background-color: var(--color_main);
      }
      
      #nprogress .spinner-icon {
            border-top-color: var(--color_main);
            border-left-color: var(--color_main);
      }
      `}</style>
		</Helmet>
	)
}

export default Index