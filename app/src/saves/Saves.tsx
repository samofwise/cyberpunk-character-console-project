import { characterContext } from '../context/CharacterContext';
import * as React from 'react';
import styled from 'styled-components';
import Character from '../models/character';

const Saves = () => {
	const characterCtx = React.useContext(characterContext);
	const [save, setSave] = React.useState(null as number);
	const [btm, setBtm] = React.useState(null as number);

	const char = new Character();
	char.stats = characterCtx.character?.stats;
	char.wounds = characterCtx.character.wounds ?? 0;

	const Save = (
		<SaveWrapper>
			<SaveTitle>SAVE</SaveTitle>
			<SaveText>{char.stats?.body && char.getSave()}</SaveText>
		</SaveWrapper>
	);

	const Btm = (
		<BtmWrapper>
			<SaveTitle>BTM</SaveTitle>
			<SaveText>{char.stats?.body && char.getBTM()}</SaveText>
		</BtmWrapper>
	);

	return (
		<BottomBarWrapper>
			{Save}
			{Btm}
		</BottomBarWrapper>
	);
};

export default Saves;

const BottomBarWrapper = styled.div`
	position: relative;
	height: 0;
`;

const SaveWrapper = styled.div`
	width: 100px;
	height: 170px;
	border: 1px solid #00ccff;
	bottom: 0;
	display: inline-block;
`;

const SaveTitle = styled.div`
	border-bottom: 1px solid #00ccff;
	width: 100%;
	text-align: center;
`;

const SaveText = styled.div`
	font-size: 50px;
	width: 100%;
	height: 100%;
`;
const BtmWrapper = styled(SaveWrapper)``;
