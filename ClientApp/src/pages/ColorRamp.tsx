import React, { useCallback, useMemo, useState } from 'react';
import { mergeStyleSets, ColorPicker, IColor, Slider, Label, ActionButton, Link } from '@fluentui/react';
import { TinyColor } from '@ctrl/tinycolor';
import { ItemCard } from '../components/ItemCard';
import { useCopyToClipboard, useMediaQuery } from 'usehooks-ts';

const styles = mergeStyleSets({
  colorContainer: {
    display: "flex",
    flexDirection: "column",
    width: 275
  },
  color: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 45,
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row"
  },
  columnContainer: {
    display: "flex",
    flexDirection: "column"
  },
  itemText: {
    paddingLeft: 8,
    paddingRight: 8
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

  return <div key={props.number} className={styles.color}
    style={{ backgroundColor: props.color, color: props.dark ? "white" : "black" }}>
    <div className={styles.itemText}>{numberText}</div>
    <div className={styles.itemText}>{props.color}</div>
  </div>
};

export const ColorRamp: React.FunctionComponent = () => {
  const [color, setColor] = useState("#5b5fc7");
  const [deviation, setDeviation] = useState(75);
  const [state, copyToClipboard] = useCopyToClipboard();
  const largeScreen = useMediaQuery('(min-width: 768px)')

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

  return <>
    <div>
      <div>
        <p>Generates a color ramp from a single color. Compatible with Fluent UI React v9, as described <Link target='_blank' href="https://react.fluentui.dev/?path=/docs/concepts-developer-theming--page">here</Link>.
          Built with <Link target='_blank' href="https://tinycolor.vercel.app/">TinyColor</Link>.</p>
        <br></br>
      </div>
      <div className={largeScreen ? styles.rowContainer : styles.columnContainer}>
        <div>
          <ItemCard>
            <Label>Pick color:</Label>
            <ColorPicker onChange={(_ev, color: IColor) => setColor(color.hex)}
              color={color}
            />
          </ItemCard>
          <ItemCard>
            <Label>Select deviation:</Label>
            <Slider min={50} max={100}
              value={deviation}
              onChange={(value) => setDeviation(value)}
            />
          </ItemCard>
        </div>
        <div>
          <ItemCard>
            <Label>Color map:</Label>
            <div className={styles.colorContainer}>
              {colors.map(y => <ColorRampView {...y} />)}
            </div>
          </ItemCard>
        </div>
        <div>
          <ItemCard>
            <Label>JSON:</Label>
            <pre>
              {prettyJson}
            </pre>
            <ActionButton onClick={copyValue}>Copy to clipboard</ActionButton>
            {state && <div>Copied</div>}
          </ItemCard>
        </div>
      </div>
    </div>
  </>

}
