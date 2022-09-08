import Styled from '@emotion/styled';

const SectionH2 = Styled.h2`
    font-style: normal;
    font-weight: 400;
    font-size: 40px;
    line-height: 52px;

    display: flex;
    align-items: center;
    text-align: center;
    color: #000000;
    margin-bottom: 16px;
    justify-content: center;
`;

const SectionDescription = Styled.p`
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 32px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #000000;
    margin: 0;
    justify-content: center;
`;

const SectionMetaInfo: React.FC<{ label: string; description?: string }> = ({
    label,
    description,
}) => {
    return (
        <>
            <SectionH2>{label}</SectionH2>
            {description && <SectionDescription>{description}</SectionDescription>}
        </>
    );
};

export default SectionMetaInfo;
