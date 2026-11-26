"use client";

import { useState } from "react";
import { Box, Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import type { StudyBody } from "@content/library/types";

/**
 * Reading view for a study with a body: Passage, Reflection, Discussion
 * Questions, Prayer. "Personal" hides the group discussion questions.
 */
export function StudyReader({ body }: { body: StudyBody }) {
  const [mode, setMode] = useState<"personal" | "group">("group");
  const hasQuestions = (body.discussionQuestions?.length ?? 0) > 0;

  return (
    <Stack gap="10" maxW="70ch">
      {hasQuestions && (
        <HStack role="group" aria-label="Reading mode" gap="0" p="1" borderRadius="full" bg="bg.muted" alignSelf="flex-start">
          {(["personal", "group"] as const).map((m) => (
            <Button
              key={m}
              size="sm"
              minH="40px"
              px="5"
              borderRadius="full"
              variant="plain"
              aria-pressed={mode === m}
              bg={mode === m ? "bg.canvas" : "transparent"}
              color={mode === m ? "fg" : "fg.muted"}
              boxShadow={mode === m ? "sm" : "none"}
              fontWeight="600"
              onClick={() => setMode(m)}
            >
              {m === "personal" ? "Personal" : "Group"}
            </Button>
          ))}
        </HStack>
      )}

      {body.passage && (
        <Box as="section" aria-labelledby="s-passage">
          <Heading as="h2" id="s-passage" textStyle="h3" mb="3">
            Passage
          </Heading>
          <Text fontWeight="700" color="brand.fg">
            {body.passage.reference}
          </Text>
          {body.passage.text && (
            <Text mt="3" fontSize="1.125rem" lineHeight="1.7">
              {body.passage.text}
            </Text>
          )}
        </Box>
      )}

      {body.reflection && body.reflection.length > 0 && (
        <Box as="section" aria-labelledby="s-reflection">
          <Heading as="h2" id="s-reflection" textStyle="h3" mb="3">
            Reflection
          </Heading>
          <Stack gap="4">
            {body.reflection.map((p) => (
              <Text key={p} fontSize="1.125rem" lineHeight="1.7">
                {p}
              </Text>
            ))}
          </Stack>
        </Box>
      )}

      {hasQuestions && mode === "group" && (
        <Box as="section" aria-labelledby="s-questions" p={{ base: "5", md: "6" }} borderRadius="lg" bg="bg.tint">
          <Heading as="h2" id="s-questions" textStyle="h3" mb="4">
            Discussion questions
          </Heading>
          <Box as="ol" ps="5" display="grid" gap="3">
            {body.discussionQuestions!.map((q) => (
              <li key={q}>
                <Text fontSize="1.0625rem" lineHeight="1.6">
                  {q}
                </Text>
              </li>
            ))}
          </Box>
        </Box>
      )}

      {body.prayer && (
        <Box as="section" aria-labelledby="s-prayer" borderStartWidth="3px" borderColor="accent.highlight" ps="5">
          <Heading as="h2" id="s-prayer" textStyle="h3" mb="3">
            Prayer
          </Heading>
          <Text fontSize="1.125rem" lineHeight="1.7" fontStyle="italic">
            {body.prayer}
          </Text>
        </Box>
      )}
    </Stack>
  );
}
