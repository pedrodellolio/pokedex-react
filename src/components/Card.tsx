import { Pokemon } from "../models/pokemon";
import { Box, Typography } from "@mui/material";
import { typeColor } from "../models/constants/typeColor";

interface Props {
  pokemon: Pokemon;
}

const Card = (props: Props, ref: any) => {
  const cardBody = (
    <Box
      sx={{
        color: 'white',
        borderRadius: 1,
        background: `linear-gradient(157deg, ${
          typeColor[props.pokemon.types[0].type.name.toUpperCase()]
        } 20%, ${
          typeColor[
            props.pokemon.types.length === 2
              ? props.pokemon.types[1].type.name.toUpperCase()
              : props.pokemon.types[0].type.name.toUpperCase()
          ]
        } 45%)`,
      }}
    >
      <Box
        sx={{
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "50% center",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 30%, #1C1B22 90%), url(${props.pokemon.sprites.other.home.front_default})`,
          transition: "all .2s",
          "&:hover": {
            backgroundSize: "110%",
            transition: "all .2s",
          },
        }}
        width={250}
        height={340}
      >
        <Typography
          fontWeight={600}
          sx={{ position: "relative", top: 260, left: 20 }}
        >
          {props.pokemon.name.toUpperCase()}
        </Typography>
        {props.pokemon.types.map((base) => {
          return (
            <Typography
              fontWeight={600}
              fontSize={12}
              textAlign="center"
              sx={{
                position: "relative",
                display: "inline-block",
                width: 65,
                p: 0.5,
                left: 10,
                bottom: 10,
                mr: 1,
                borderRadius: 1,
                backgroundColor: `#1C1B22`,
              }}
            >
              {base.type.name.toUpperCase()}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );

  const content = <div>{cardBody}</div>;

  return content;
};

export default Card;
