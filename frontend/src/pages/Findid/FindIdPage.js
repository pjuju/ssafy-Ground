import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Grid }  from "@mui/material";
import { RectButton } from "../../components/RectButton";

function FindIdPage() {
    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <TextField
                    id="email"
                    label="이메일"
                />
            </Grid>
            <Grid item xs={4}>
                <RectButton text="인증번호 전송"/>
            </Grid>
            <Grid item xs={8}>
                <TextField
                    id="verification-number"
                    label="인증번호"
                />
            </Grid>
            <Grid item xs={4}>
                <RectButton text="인증"/>
            </Grid>
        </Grid>
    );
}

export default FindIdPage;