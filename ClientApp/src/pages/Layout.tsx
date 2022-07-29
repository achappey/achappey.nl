import { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router';
import { Home } from './Home';
import { makeStyles, tokens } from '@fluentui/react-components';
import { Header } from '../components/Header';
import { Profiles } from './Profiles';
import { FluentProvider } from '@fluentui/react-components';
import { customDarkTheme, customLightTheme } from '../config/theme';
import { Languages } from './Languages';
import { useTheme } from '../hooks/useTheme';
import { ColorRamp } from './ColorRamp';

const useStyles = makeStyles({
  container: {
    display: "flex",
    backgroundColor: tokens.colorBackgroundOverlay,
    flexDirection: "column",
    paddingLeft: "8px",
    '@media(min-width: 768px)': {
      paddingLeft: "16px",
    },
  }
})

export const Layout: FunctionComponent = () => {
  const classes = useStyles()
  const { darkTheme, toggleTheme } = useTheme()
  const theme = darkTheme ? customDarkTheme : customLightTheme

  return <FluentProvider theme={theme}>
    <div className={classes.container}>
      <div>
        <Header toggleTheme={toggleTheme} darkTheme={darkTheme} />
      </div>

      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profiles' element={<Profiles />} />
          <Route path='/languages' element={<Languages />} />
          <Route path='/colorramp' element={<ColorRamp />} />
        </Routes>
      </div>
    </div>
  </FluentProvider>
}
