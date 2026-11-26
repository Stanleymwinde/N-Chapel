
import { RichText } from "@/components/RichText";
import { ChCaption, ChDiv, ChSpan, ChTable, ChTd, ChTh, ChThead, ChTr } from "@/components/primitives";

type AgeGroup = {
  group: string;
  meaning: string;
  ages: string;
  classes: readonly { name: string; meaning: string; age: string }[];
};

/** Quest age groups as a real, accessible table (not an image). */
export function AgeGroupTable({ groups, caption }: { groups: readonly AgeGroup[]; caption: string }) {
  return (
    <ChDiv overflowX="auto" borderWidth="1px" borderColor="border" borderRadius="lg" bg="bg.canvas" tabIndex={0} role="region" aria-label={caption}>
      <ChTable w="100%" borderCollapse="collapse" textAlign="left" minW="520px">
        <ChCaption textAlign="left" p="5" pb="3" textStyle="h4" fontFamily="heading" captionSide="top">
          {caption}
        </ChCaption>
        <ChThead bg="bg.tint">
          <tr>
            {["Group", "Class", "Meaning", "Age (years)"].map((h) => (
              <ChTh key={h} scope="col" px="5" py="3" textStyle="small" fontWeight="700" color="fg">
                {h}
              </ChTh>
            ))}
          </tr>
        </ChThead>
        <tbody>
          {groups.map((g) =>
            g.classes.map((c, i) => (
              <ChTr key={`${g.group}-${c.name}`} borderTopWidth="1px" borderColor="border">
                {i === 0 && (
                  <ChTh scope="rowgroup" rowSpan={g.classes.length} px="5" py="4" verticalAlign="top" bg="bg.warm" fontWeight="400">
                    <ChSpan display="block" fontFamily="heading" fontWeight="700" fontSize="1.25rem" color="brand.fg">
                      {g.group}
                    </ChSpan>
                    <ChSpan display="block" textStyle="small" color="fg.muted">
                      “{g.meaning}”, {g.ages}
                    </ChSpan>
                  </ChTh>
                )}
                <ChTd px="5" py="4" fontWeight="600">
                  {c.name}
                </ChTd>
                <ChTd px="5" py="4" color="fg.muted">
                  {c.meaning}
                </ChTd>
                <ChTd px="5" py="4">
                  <RichText text={c.age} />
                </ChTd>
              </ChTr>
            )),
          )}
        </tbody>
      </ChTable>
    </ChDiv>
  );
}
