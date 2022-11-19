import {useState, useEffect} from "react";
import {PokemonController} from "./api/controllers/PokemonController";
import {Pokemon} from "./models/pokemon";
import {
    Autocomplete,
    Box, CircularProgress,
    Container,
    FormControl,
    Grid,
    MenuItem,
    OutlinedInput,
    Select,
    TextField, Typography,
} from "@mui/material";
import Card from "./components/Card";
import "./App.css";
import {BaseResource} from "./models/baseResource";
import {RegionController} from "./api/controllers/RegionController";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

export default function App() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [regionsBase, setRegionsBase] = useState<BaseResource[]>([]);
    const [selectedRegionName, setSelectedRegionName] = useState<string>("kanto");
    const [searchedPokemonName, setSearchedPokemonName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        new RegionController().getAllRegions().then((response) => {
            setRegionsBase(response.results);
        });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        setPokemons([]);
        new PokemonController()
            .getPokemonsByRegionName(selectedRegionName)
            .then((response) => {
                setPokemons(response);
                setIsLoading(false);
            });
    }, [selectedRegionName]);

    return (
        <div>
            <Box component="nav"
                 sx={{display: "flex", alignItems: "center", justifyContent: {xs: "space-between", md: "start"}, p: 3}}>
                <Typography variant="h5" color={"white"} fontWeight={600}>Pokédex</Typography>
                <FormControl sx={{m: 1, px: 3, width: 300}}>
                    <Select
                        sx={{color: "#fff", backgroundColor: "#18181C"}}
                        value={selectedRegionName}
                        onChange={(event) => setSelectedRegionName(event.target.value)}
                        input={<OutlinedInput/>}
                        inputProps={{"aria-label": "Without label"}}
                        renderValue={(selected) => {
                            return selected.slice(0, 1).toUpperCase() + selected.slice(1, selected.length);
                        }}
                    >
                        {regionsBase.map((base) => (
                            <MenuItem key={base.name} value={base.name}>
                                {base.name.slice(0, 1).toUpperCase() + base.name.slice(1, base.name.length)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Container maxWidth="lg" sx={{mt: 5}}>

                <Autocomplete
                    sx={{color: "#fff", backgroundColor: "#18181C"}}
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    onInputChange={(event, newInput) =>
                        setSearchedPokemonName(newInput)
                    }
                    options={pokemons.map((option) => option)}
                    renderOption={(props, option) => (
                        <Box
                            component="li"
                            sx={{"& > img": {mr: 2, flexShrink: 0}}}
                            {...props}
                        >
                            <img
                                loading="lazy"
                                width="50"
                                src={`${option.sprites.front_default}`}
                                srcSet={`${option.sprites.front_default} 2x`}
                                alt=""
                            />
                            {option.name.slice(0, 1).toUpperCase() + option.name.slice(1, option.name.length)}
                        </Box>
                    )}
                    filterOptions={(options) =>
                        searchedPokemonName !== ""
                            ? options.filter((o) => o.name.startsWith(searchedPokemonName))
                            : []
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search"
                            InputProps={{
                                ...params.InputProps,
                                type: "search",
                            }}
                        />
                    )}
                />
            </Container>

            {isLoading ?
                <Container maxWidth="lg" sx={{mt: 5, display: "flex", justifyContent: "center"}}>
                    <CircularProgress/>
                </Container>
                :
                <Container maxWidth="lg" sx={{mt: 5}}>

                    <Box>
                        <Grid container spacing={1} justifyContent={"center"} sx={{mt: 5}}>
                            {pokemons.map((pokemon) => {
                                return (
                                    <Grid item>
                                        <Card pokemon={pokemon} key={pokemon.id}/>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                </Container>

            }

        </div>
    );
}
