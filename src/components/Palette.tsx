import styled from "@emotion/styled";
import VariablePalette from "./Palette/VariablePalette";
import LayerPalette from "./Palette/LayerPalette";

const Wrap = styled.div`
  padding: 0px 40px;
  display: flex;
  border: solid 1px 0px #404040;
  gap: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export default function Palette() {
  return (
    <Wrap>
      <LayerPalette />
      <VariablePalette />
    </Wrap>
  );
}
