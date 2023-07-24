import styled from "styled-components";
import Users from "./users";
import Flags from "./flagged";

const Wrapper = styled.div`

    margin: 5%;
    padding: 10px;
    backdrop-filter: blur(3px) brightness(1.1);
    border: solid var(--accentTheme) 1px;

    display: grid;
    grid-template-columns: repeat(5, 20%);
    grid-template-rows: 10vh repeat(4, 50vh);

    h1, h2, h3, h4, a, p {
        font-family: 'Comp';
    }
`;

const Dashboard =  () => {
    return (
        <Wrapper>
            <h1 style={{gridColumn: 'span 5', color: 'white', textAlign: 'center'}}>Admin Dashboard</h1>
            <div style={{gridColumn: 'span 3', gridRow: 'span 2', padding: '10px', margin: '3px', border: 'solid var(--accentThemeDarker) 1px'}}>
                <h3 style={{color: 'white', textAlign: 'center'}}>Users</h3>
                <Users/>
            </div>
            <div style={{gridColumn: 'span 2', gridRow: 'span 2', padding: '10px', margin: '3px', border: 'solid var(--accentThemeDarker) 1px'}}>
                <h3 style={{color: 'white', textAlign: 'center'}}>Flags</h3>
                <Flags/>
            </div>
        </Wrapper>
    )
}

export default Dashboard;