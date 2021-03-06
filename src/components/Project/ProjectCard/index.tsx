import React from 'react';
import { projectListDataTpye } from '../../../types/types';
import { CardContainer, ProjectEditLink, ProjectImageWrap, ProjectName, ProjectImage, ProjectUrl } from './styles';

interface Props {
	data: projectListDataTpye;
}

const ProjectCard = ({ data }: Props): JSX.Element => {
	return (
		<CardContainer to={`/workspace/${data.projectURL}/chat/General`}>
			<ProjectImageWrap>
				<ProjectImage style={{ backgroundColor: `${data.projectColor}` }}>{data.name[0]}</ProjectImage>
			</ProjectImageWrap>
			<ProjectName>{data.name}</ProjectName>
			<ProjectUrl>reciper.me/{data.projectURL}</ProjectUrl>
			<ProjectEditLink to={`/project/${data.projectURL}/edit`}>레시피 설정</ProjectEditLink>
		</CardContainer>
	);
};

export default ProjectCard;
