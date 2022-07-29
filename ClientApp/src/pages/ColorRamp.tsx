import React, { useCallback, useMemo, useState } from 'react'
import { makeStyles, Slider, Button, Link } from '@fluentui/react-components'
import { ClipboardRegular, ClipboardCheckmarkRegular } from '@fluentui/react-icons'
import { TinyColor } from '@ctrl/tinycolor'
import { ItemCard } from '../components/ItemCard'
import { useCopyToClipboard } from 'usehooks-ts'
import { SpinButton } from '@fluentui/react-components/unstable'
import { PageHeader } from '../components/PageHeader'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles({
  wrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(1, 1fr)",
    gridAutoRows: "minmax(100px, auto)",
    '@media(min-width: 600px)': {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    '@media(min-width: 768px)': {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
  colorContainer: {
    display: "flex",
    flexDirection: "column",
  },
  color: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "45px",
  },
  itemText: {
    paddingLeft: "8px",
    paddingRight: "8px"
  }
})

interface IColorView {
  number: number
  dark: boolean
  color: string
  description?: string
}

const toHexText = (color: string) => {
  return color.startsWith("#") ? color : `#${color}`;
}

const ColorRampView: React.FunctionComponent<IColorView> = (props) => {
  const numberText = props.description ? `${props.number.toString()} (${props.description})` : props.number.toString();
  const classes = useStyles()

  return <div className={classes.color}
    style={{ backgroundColor: props.color, color: props.dark ? "white" : "black" }}>
    <div className={classes.itemText}>{numberText}</div>
    <div className={classes.itemText}>{props.color}</div>
  </div>
};

export const ColorRamp: React.FunctionComponent = () => {
  const [color, setColor] = useState("#FFA500")
  const [deviation, setDeviation] = useState(75)
  const [state, copyToClipboard] = useCopyToClipboard()
  const classes = useStyles()
  const { t } = useTranslation()

  const colors = useMemo(() => {
    const result: IColorView[] = [{ number: 80, color: toHexText(color), dark: true, description: "Primary" }];
    let tinyColor = new TinyColor(color);

    const absoluteDeviation = (6 / 100) * deviation;

    for (let i = 7; i > 0; i--) {
      tinyColor = tinyColor.darken(absoluteDeviation);

      result.unshift({
        number: i * 10,
        dark: true,
        color: toHexText(tinyColor.toHex())
      })
    }

    tinyColor = new TinyColor(color);

    for (let i = 9; i <= 16; i++) {
      tinyColor = tinyColor.lighten(absoluteDeviation);

      result.push({
        number: i * 10,
        dark: false,
        color: toHexText(tinyColor.toHex()),
        description: i === 10 ? "Dark primary" : undefined
      })
    }

    return result;
  }, [color, deviation]);

  const colorMap = useMemo(() => {
    const result: any = {}

    colors.forEach(element => {
      result[element.number] = element.color
    });

    return result;
  }, [colors]);

  const prettyJson = useMemo(() => {
    return JSON.stringify(colorMap, null, 2);
  }, [colorMap]);

  const copyValue = useCallback(() => {
    copyToClipboard(prettyJson);
  }, [prettyJson, copyToClipboard])


  const clipboardButton = [<Button icon={state ? <ClipboardCheckmarkRegular /> : <ClipboardRegular />} onClick={copyValue}>Copy to clipboard</Button>];

  return <div>
    <PageHeader title={t('ColorRamp')} />
    <div>
      <p>Generates a color ramp from a single color. Compatible with Fluent UI React v9, as described <Link target='_blank' href="https://react.fluentui.dev/?path=/docs/concepts-developer-theming--page">here</Link>.
        Built with <Link target='_blank' href="https://tinycolor.vercel.app/">TinyColor</Link>.</p>
    </div>
    <div className={classes.wrapper}>
      <div>
        <ItemCard title={"Pick a color"}>
          <input type="color"
            value={color}
            onChange={(ev) => setColor(ev.target.value)}
          />
        </ItemCard>
        <ItemCard title={"Select deviation"}>
          <SpinButton min={50} max={100}
            value={deviation}
            onChange={(_ev, data) => setDeviation(data.value!)}
          />
          <Slider min={50} max={100}
            value={deviation}
            onChange={(_ev, data) => setDeviation(data.value)}
          />
        </ItemCard>
      </div>
      <div>
        <ItemCard title={"ColorRamp"}>
          <div className={classes.colorContainer}>
            {colors.map(y => <ColorRampView key={y.number} {...y} />)}
          </div>
        </ItemCard>
      </div>
      <div>
        <ItemCard title={"JSON"}
          buttons={clipboardButton}>
          <pre>
            {prettyJson}
          </pre>
        </ItemCard>
      </div>
    </div>
  </div>

}
