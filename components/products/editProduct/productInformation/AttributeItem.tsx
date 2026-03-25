import { LightTooltip } from "@/components/common/Tooltip/tooltip";
import { Box, Button, Tooltip } from "@mui/material";
import { capitalize } from "lodash";
import Image from "next/image";

export const AttributeItem = ({
  data,
  handleAttributeChange,
  List,
  addNewChoice,
  error,
  newAttributeValue,
  loading
}) => {

  const { name, values, selected, id, user_id } = data;

  const firstLetterCapital = (str) => {
    return `${str}`.charAt(0).toUpperCase() + `${str}`.toLowerCase().slice(1);
  };

  const onChangeHandler = () => {
    let specification = [...List];
    const index = specification.findIndex((v) => v.id === id);
    specification[index].selected = !selected;
    addNewChoice(id, name, !selected, user_id);
    handleAttributeChange(index, specification);
  };

  return (
    <LightTooltip title={name} arrow placement="top" disableInteractive>
      <Button
        disabled={loading}
        style={{
          padding: "0",
          color: `${error && firstLetterCapital(newAttributeValue) == firstLetterCapital(name) ? "#d7282f" : "#000000"}`,
          // border: `${error && firstLetterCapital(newAttributeValue) == firstLetterCapital(name) ? "1px solid #d7282f" : "1px solid rgb(179, 177, 177)"}`,
          textTransform: "none",
          minWidth: "0",
          height: '26px',
          backgroundColor: `${loading ? '#D3D3D3' : 'transparent'}`
        }}
        onClick={() => {
          onChangeHandler();
        }}
      >
        <div
          style={{
            // border: "1px solid #B3B1B1",
            border: `${error && firstLetterCapital(newAttributeValue) == firstLetterCapital(name) ? "1px solid #d7282f" : "1px solid #B3B1B1"}`,
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "24px",
            display: "flex",
            // paddingLeft: "6px",
            paddingRight: "6px",
            borderRadius: "6px",
            cursor: 'pointer',
            height: "100%",
          }}
        >
          {selected && (
            <div
              style={{
                position: "relative",
                display: "inline-block",
                width: "22px",
                height: "24px",
                borderTopLeftRadius: "6px",
                borderBottomLeftRadius: "6px",
                border: "none`",
              }}
            >
              <Image
                style={{
                  width: "106%",
                }}
                width={22}
                height={24}
                src={"/assets/selectedAttribute.svg"}
                alt="img"
              />
            </div>
          )}
          <div>
            <Box component='span'
              sx={{
                display: "inline-block",
                paddingLeft: "6px",
                // textTransform: "capitalize",
                textOverflow: "ellipsis",
                maxWidth: '120px',
                overflow: 'hidden',
                whiteSpace: "nowrap",
                textAlign: 'left',
                "@media screen and (max-width:480px)": {
                  width: '160px'
                },
              }}
            >
              {firstLetterCapital(name) || "Test"}
            </Box>
          </div>
        </div>
      </Button>
    </LightTooltip>
  );
};
