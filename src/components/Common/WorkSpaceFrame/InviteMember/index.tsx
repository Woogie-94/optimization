import React, { KeyboardEvent, useCallback, useState } from 'react';
import { useParams } from 'react-router';

import Button from '../../Button';
import Input from '../../Input';

import useInput from '../../../../hooks/useInput';
import { axiosRequest } from '../../../../utils/axios';
import { emailValid } from '../../../../utils/validations';

import { InviteItem } from '../../../ProjectCreate/CreateContaniner/styles';
import {
	DeleteInviteItem,
	InviteItemEmail,
	InviteMemberWrap,
	Title,
	InfoText,
	InviteList,
	InviteBtnWrap,
	SuccessText,
	StateMessage,
} from './styles';

const InviteMemner = (): JSX.Element => {
	const { projectUrl } = useParams<{ projectUrl: string }>();
	const [inviteEmail, onChangeInviteEmail, setInviteEmial] = useInput<string>('');
	const [inviteList, setInviteList] = useState<string[]>([]);
	const [successMessage, setSuccessMessage] = useState<boolean>(false);
	const [emailValidation, setEmailValidation] = useState<boolean>(true);
	const [duplcate, setDuplcateCheck] = useState<boolean>(true);

	const onAddMember = useCallback(
		(e: KeyboardEvent): void => {
			if (e.key === 'Enter') {
				const emailCheck = emailValid(inviteEmail);

				setSuccessMessage(false);
				setEmailValidation(emailCheck);

				if (emailCheck) {
					const duplcateCheck = inviteList.indexOf(inviteEmail) + 1;

					if (duplcateCheck) {
						setDuplcateCheck(false);
						return;
					}

					setInviteEmial('');
					setInviteList([...inviteList, inviteEmail]);
					setSuccessMessage(false);
				}
			}
		},
		[inviteEmail, inviteList],
	);

	const onDeleteInviteItem = useCallback(
		(index: number): void => {
			const newInviteList = [...inviteList];
			newInviteList.splice(index, 1);

			setInviteList(newInviteList);
		},
		[inviteList],
	);

	const onInvite = useCallback(async () => {
		if (inviteList.length === 0) {
			return;
		}

		const reponse = await axiosRequest('post', `/projectInvite/${projectUrl}`, { inviteList });

		if (reponse) {
			setInviteList([]);
			setSuccessMessage(true);
			setDuplcateCheck(true);
		}
	}, [inviteList]);

	return (
		<InviteMemberWrap>
			<Title>????????? ?????? ????????????</Title>
			<InfoText>???????????? ????????? ???????????? ???????????????.</InfoText>
			<Input
				width="long"
				height="long"
				initValue={inviteEmail}
				placeholderText="????????? ???????????? ??????????????? Enter??? ????????????"
				changeEvent={onChangeInviteEmail}
				keyEvent={onAddMember}
			/>
			<StateMessage>
				{!emailValidation && '????????? ????????? ???????????? ??????????????????'}
				{!duplcate && '?????? ?????? ??? ????????? ?????????.'}
				{successMessage && <SuccessText>?????? ???????????? ?????? ???????????????.</SuccessText>}
			</StateMessage>
			<InviteList>
				{inviteList.map((email, index) => (
					<InviteItem key={index}>
						<InviteItemEmail>{email}</InviteItemEmail>
						<DeleteInviteItem onClick={() => onDeleteInviteItem(index)} />
					</InviteItem>
				))}
			</InviteList>

			<InviteBtnWrap>
				<Button size="medium" clickEvent={onInvite}>
					????????????
				</Button>
			</InviteBtnWrap>
		</InviteMemberWrap>
	);
};

export default InviteMemner;
