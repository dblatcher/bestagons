import { HexWrapper, HexagonBox } from "@dblatcher/bestagons"

export const NestingComponentsExample = () => {

    const list = ['a', 'b', 'c']

    return <><HexWrapper>
        <HexagonBox>1</HexagonBox>
        <HexagonBox>2</HexagonBox>
        <HexagonBox>3</HexagonBox>
        {list.map(item => (
            <HexagonBox key={item}>{item}</HexagonBox>
        ))}
        {list.map(item => (
            <HexagonBox key={item}>{item}</HexagonBox>
        ))}
        <HexagonBox>end</HexagonBox>
    </HexWrapper>
    </>
}