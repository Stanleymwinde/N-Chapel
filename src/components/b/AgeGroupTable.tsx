import { RichText } from "@/components/RichText";
import { ChCaption, ChDiv, ChSpan, ChTable, ChTd, ChTh, ChThead, ChTr } from "@/components/primitives";

type AgeGroup = {
  group: string;
  meaning: string;
  ages: string;
  classes: readonly { name: string; meaning: string; age: string }[];
};

/**
 * Quest age groups as a real, accessible table (not an image), styled after
 * the Figma "Quest classes by age" card: white, 12px radius, tinted header.
 */
export function AgeGroupTable({ groups, caption }: { groups: readonly AgeGroup[]; caption: string }) {
  const cell = { py: "14px", pr: "4", fontSize: "0.9375rem", lineHeight: "1.3" } as const;
  return (
    <ChDiv overflowX="auto" h="full" borderWidth="1px" borderColor="border" borderRadius="12px" bg="bg.canvas" tabIndex={0} role="region" aria-label={caption}>
      <ChTable w="100%" borderCollapse="collapse" textAlign="left" minW="480px">
        <ChCaption textAlign="left" px="4" pt="4" pb="3" fontSize="0.9375rem" fontWeight="600" captionSide="top">
          {caption}
        </ChCaption>
        <ChThead bg="bg.tint">
          <tr>
            {["Group", "Class", "Meaning", "Age (years)"].map((h, i) => (
              <ChTh key={h} scope="col" pl={i === 0 ? "4" : "0"} pr="4" py="10px" w={i === 0 ? "205px" : i < 3 ? "105px" : undefined} fontSize="0.75rem" fontWeight="600" color="fg">
                {h}
              </ChTh>
            ))}
          </tr>
        </ChThead>
        <tbody>
          {groups.map((g) =>
            g.classes.map((c, i) => {
              const rule = { borderTopWidth: "1px", borderColor: "border" } as const;
              return (
                <ChTr key={`${g.group}-${c.name}`} {...(i === 0 ? rule : {})}>
                  {i === 0 && (
                    <ChTh scope="rowgroup" rowSpan={g.classes.length} pl="4" pr="4" pt="14px" verticalAlign="top" fontWeight="400">
                      <ChSpan display="block" fontWeight="600" fontSize="1rem" color="brand.fg">
                        {g.group}
                      </ChSpan>
                      <ChSpan display="block" mt="3px" fontSize="0.6875rem" color="fg.muted">
                        “{g.meaning}”, {g.ages}
                      </ChSpan>
                    </ChTh>
                  )}
                  <ChTd {...cell} {...(i > 0 ? rule : {})} fontWeight="500">
                    {c.name}
                  </ChTd>
                  <ChTd {...cell} {...(i > 0 ? rule : {})} color="fg.muted">
                    {c.meaning}
                  </ChTd>
                  <ChTd {...cell} {...(i > 0 ? rule : {})}>
                    <RichText text={c.age} />
                  </ChTd>
                </ChTr>
              );
            }),
          )}
        </tbody>
      </ChTable>
    </ChDiv>
  );
}
