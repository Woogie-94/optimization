import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import Button from '../Common/Button';
import Input from '../Common/Input';

import useInput from '../../hooks/useInput';
import { axiosRequest } from '../../utils/axios';
import { projectNameValid, projectUrlValid } from '../../utils/validations';

import { projectCreateDataType, projectListDataTpye } from '../../types/types';

import { Container, InfoMessage, Inner } from '../ProjectCreate/CreateContaniner/styles';
import { EditSubTitle, EditTitle, EditUrlWrap, ProjectDeleteBtn, ProjectImage, EditBtnWrap, EditUrl } from './styles';

const EditContainer = (): JSX.Element => {
	const history = useHistory();
	const { projectUrl } = useParams<{ projectUrl: string }>();
	const [name, onChangeName, setName] = useInput<string>('');
	const [projectURL, onChangeProjectURL, setProjectURL] = useInput<string>('');
	const [projectData, setProjectData] = useState<projectListDataTpye>();
	const [projectInfo, setProjectInfo] = useState<projectCreateDataType>();
	const [nameValidation, setNameValidation] = useState<boolean>(true);
	const [urlValidation, setUrlValidation] = useState<boolean>(true);
	const [urlDuplicate, setUrlDuplicate] = useState<boolean>(false);

	const getProjectData = useCallback(async () => {
		const response: projectListDataTpye | void = await axiosRequest('get', `/project/${projectUrl}`);

		if (response) {
			setProjectData(response);
			setName(response.name);
			setProjectURL(response.projectURL);
		}
	}, []);

	useEffect(() => {
		getProjectData();
	}, []);

	useEffect(() => {
		setProjectInfo({ name, projectURL });
	}, [name, projectURL]);

	const onEditProject = useCallback(async () => {
		const nameCheck = projectNameValid(name);
		const urlCheck = projectUrlValid(projectURL);

		setNameValidation(nameCheck);
		setUrlValidation(urlCheck);

		if (name && projectURL && nameCheck && urlCheck) {
			const response = await axiosRequest('post', `/project/${projectUrl}`, projectInfo);

			if (!!response) {
				history.push('/project');
			} else {
				setUrlDuplicate(true);
			}
		}
	}, [name, projectURL, projectInfo]);

	const onDeleteProject = useCallback(async () => {
		await axiosRequest('delete', `/project/${projectUrl}`);
		history.push('/project');
	}, [projectInfo]);

	return (
		<Container>
			{projectData && (
				<Inner>
					<EditTitle>????????? ??????</EditTitle>
					<ProjectImage style={{ backgroundColor: `${projectData.projectColor}` }}>{projectData.name[0]}</ProjectImage>
					<EditSubTitle>????????? ??????</EditSubTitle>
					<Input
						width="long"
						height="long"
						initValue={name}
						placeholderText="????????? ????????? ???????????????"
						changeEvent={onChangeName}
					/>
					<InfoMessage>{!nameValidation && '???????????? ????????? 15??? ????????? ???????????? ?????????.'}</InfoMessage>

					<EditSubTitle>????????? URL??? ???????????????.</EditSubTitle>
					<EditUrlWrap>
						<EditUrl>reciper.me/</EditUrl>
						<Input
							width="long"
							height="long"
							initValue={projectURL}
							placeholderText="????????? ????????? ???????????????"
							changeEvent={onChangeProjectURL}
						/>
					</EditUrlWrap>
					<InfoMessage style={{ marginLeft: '117px' }}>
						{!urlValidation && 'URL??? ??????????????? ????????? ????????? 4 ~ 20??? ????????? ???????????? ?????????.'}
						{urlDuplicate && '?????? URL??? ?????? ???????????? URL?????????.'}
					</InfoMessage>

					<ProjectDeleteBtn onClick={onDeleteProject}>????????? ??????</ProjectDeleteBtn>
					<EditBtnWrap>
						<Button size="medium" buttonType="cancel" clickEvent={() => history.push('/project')}>
							??????
						</Button>
						<Button size="medium" margin="0 0 0 20px;" clickEvent={onEditProject}>
							??????
						</Button>
					</EditBtnWrap>
				</Inner>
			)}
		</Container>
	);
};

export default EditContainer;
