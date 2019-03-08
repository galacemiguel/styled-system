import React, { useState, useEffect } from 'react'
import Readme from '@styled-system/typography/README.md'
import styled from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'
import { space, color } from 'styled-system'
import lincoln from 'typography-theme-lincoln'
import merge from 'lodash.merge'
import Typography from '@styled-system/typography'
import transform from '@styled-system/typography/dist/transform-typography-theme'
import Modern from '@styled-system/typography/modern'
import Future from '@styled-system/typography/future'
import Baskerville from '@styled-system/typography/baskerville'
import RRoboto from '@styled-system/typography/roboto'
import PPoppins from '@styled-system/typography/poppins'
import { Text } from '../../components'
import Header from '../../Header'
import Footer from '../../Footer'

const Select = styled('select')({
  fontFamily: 'inherit',
  fontSize: '14px',
  color: 'inherit',
  backgroundColor: 'transparent',
  border: '2px solid',
  borderRadius: 8,
  padding: 8,
  appearance: 'none',
  '&:focus': {
    color: '#c0c',
    outline: 'none',
  }
})

const system = {
}

const getFontHREF = fonts => '//fonts.googleapis.com/css?family=' +
  fonts.map(font => {
    let str = ''
    str += font.name.split(' ').join('+')
    str += ':'
    str += font.styles.join(',')
    return str
  }).join('|')

export const GoogleFont = props => {
  useEffect(() => {
    if (!props.theme.googleFonts) return
    const link = document.head.appendChild(
      document.createElement('link')
    )
    link.href = getFontHREF(props.theme.googleFonts)
    link.setAttribute('rel', 'stylesheet')

    return () => {
      link.remove()
    }
  })

  return false
}

const Roboto = props =>
  <>
    <GoogleFont
      theme={{
        googleFonts: [
          { name: 'Roboto', styles: [400,700] },
          { name: 'Roboto Mono', styles: [400] },
        ]
      }}
    />
    <RRoboto
      {...props}
      maxWidth={1024}
      mx='auto'
    />
  </>

const Poppins = props =>
  <>
    <GoogleFont
      theme={{
        googleFonts: [
          { name: 'Poppins', styles: [400, 700, 900] },
          { name: 'Roboto Mono', styles: [400] },
        ]
      }}
    />
    <PPoppins {...props} />
  </>

const configs = {
  lincoln: transform(lincoln),
}
const Lincoln = props =>
  <>
    <GoogleFont theme={lincoln} />
    <Typography
      {...merge({
        maxWidth: 768,
        mx: 'auto',
        px: [3,4],
        py: 4,
      }, configs.lincoln, props)}
    />
  </>

const themes = {
  Modern,
  Future,
  Baskerville,
  Roboto,
  Poppins,

  // typography.js themes
  Lincoln,
}

const names = Object.keys(themes)

export default props => {
  const [ theme, setTheme ] = useState('Future')
  const Layout = themes[theme]
  return (
    <ThemeProvider theme={system}>
      <Header>
        <div>
          <Text
            as='label'
            htmlFor='theme'
            fontSize={1}
            mr={2}>
            Theme
          </Text>
          <Select
            id='theme'
            name='theme'
            value={theme}
            onChange={e => {
              setTheme(e.target.value)
            }}>
            {names.map(name => (
              <option
                key={name}
                label={name}
                value={name}
              />
            ))}
          </Select>
        </div>
      </Header>
      <Layout>
        <Readme />
      </Layout>
      <Footer
        maxWidth='none'
        color='white'
        bg='black'
      />
    </ThemeProvider>
  )
}

