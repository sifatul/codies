import React from 'react';
import Styled from '@emotion/styled';
import EditButton from './EditButton';

const SitebarMainContainer = Styled.div`
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 12px;
`;

const SidebarContainer = Styled.div`
    display: flex;
    flex-wrap: wrap;
    
`;

const SidebarHeaderContainer = Styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 12px 0;
    padding: 8px 12px;
   
`;

const SidebarHeader = Styled.h3`
    font-weight: 600;
    font-size: 20px;
    margin: 0;
`;

const Title = Styled.p`
    font-weight: 500;
    font-size: 16px;
    margin: 0;
    margin-bottom: 8px;
    width: 100%;
`;

const Paragraph = Styled.p`
    font-weight: 300;
    font-size: 16px;
    margin: 0;
    margin-bottom: 0;
    display: flex;
    width: 100%;
    margin-bottom: 10px
`;

const SidebarItemContainer = Styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    flex-wrap: wrap;
    margin-bottom: 10px;
`;

const SmallText = Styled.span`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    margin: 0;
    font-size: 12px;
    margin-left: 5px;
    line-height: 1.5;
    color: #444444;
`;

const CommitList = Styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
`

const CommitItem = Styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`


const CommitSkill = Styled.h4`
    font-weight: 400;
    color: #0969da;
    margin: 0;
`


const CommitCount = Styled.p`
    color: #444444;
    margin: 0;
`

const SideBar = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    const programming = [

        {
            id: 1,
            name: 'Typescript'
        },

        {
            id: 2,
            name: 'HTML'
        },


        {
            id: 13,
            name: 'JavaScript'
        },
    ]


    return (
        <SitebarMainContainer>
            <SidebarHeaderContainer>
                <SidebarHeader>About </SidebarHeader>
                <div>
                    <EditButton onClick={openModal} />
                </div>
            </SidebarHeaderContainer>
            <SidebarContainer>
                <SidebarItemContainer>
                    <Title>Contact</Title>
                    <Paragraph>Full-time</Paragraph>
                </SidebarItemContainer>
                <SidebarItemContainer>
                    <Title>Earliest start date</Title>
                    <Paragraph>After 3 months notice period</Paragraph>
                </SidebarItemContainer>

                <SidebarItemContainer>
                    <Title>Work permit</Title>
                    <Paragraph>No <SmallText>  (more information about the visa may be found in the summery) </SmallText> </Paragraph>
                </SidebarItemContainer>




                <SidebarItemContainer>
                    <Title>Languages</Title>
                    <Paragraph>Bengali <SmallText>  (native) </SmallText> </Paragraph>
                    <Paragraph>English <SmallText>  (Fluent) </SmallText> </Paragraph>
                </SidebarItemContainer>



            </SidebarContainer>

            <SidebarHeaderContainer>
                <SidebarHeader>Work location and salary </SidebarHeader>
                <div>
                    <EditButton onClick={openModal} />
                </div>
            </SidebarHeaderContainer>

            <SidebarContainer>


                <SidebarItemContainer>

               {Array.from({length: 15}, (_, i) => i + 1).map(() => {
                    return (
                    <Paragraph>Frankfurt <SmallText>  (+$400000) </SmallText> </Paragraph>
                    )
                })}

                </SidebarItemContainer>


                <SidebarItemContainer>
                    <Title>Contributions</Title>
                    <Paragraph>You currently do not have any contributions. Recruiters won't see this section while it's empty. </Paragraph>
                </SidebarItemContainer>



                <SidebarItemContainer>
                    <Title>Programming</Title>
                    <CommitList>

                        {programming.map((prg) => {
                            return (
                                <CommitItem key={prg.id}>

                                    <CommitSkill>
                                        {prg.name}

                                    </CommitSkill>

                                    <CommitCount>
                                        18 commits
                                    </CommitCount>

                                </CommitItem>
                            )
                        })}


                    </CommitList>
                </SidebarItemContainer>

            </SidebarContainer>


        </SitebarMainContainer>
    );
};

export default SideBar;
