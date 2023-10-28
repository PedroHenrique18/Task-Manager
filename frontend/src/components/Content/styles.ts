import styled from 'styled-components'

export const Container = styled.div`
    grid-area: CT;
    background-color: #FFFFfF;
    color:#000;
    margin: 0;
`;

export const Filters = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

    .tag-filter {
        font-size: 18px;
        font-weight: 500;
        background:none;
        color:#000;
        border: none;
        margin: 0 10px;
        margin-bottom: 30px;
        margin-top: 15px;
        
        opacity: 0.5;
        transition: opacity .3s;
        &:hover {
            opacity: 0.5;

        }
    }
    .tag-filter-concluido{

        &::after{
            content: '';
            display: block;
            width: 55px;
            margin: 0 auto;
            border: 7px solid green;
        }
    }

    .tag-filter-incompleta{

        &::after{
            content: '';
            display: block;
            width: 55px;
            margin: 0 auto;
            border: 7px solid red;
        }
    }
    .tag-actived{
        opacity: 1;
    }
    

`;