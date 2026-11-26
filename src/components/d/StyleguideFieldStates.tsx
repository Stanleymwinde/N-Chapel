"use client";

import { Field, Input, SimpleGrid } from "@chakra-ui/react";

/** Static field states for the styleguide (default, invalid, disabled). */
export function StyleguideFieldStates() {
  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} gap="6" maxW="900px">
      <Field.Root>
        <Field.Label fontWeight="600">Full name</Field.Label>
        <Input size="lg" bg="bg.canvas" borderColor="border.strong" defaultValue="Wanjiku" />
        <Field.HelperText color="fg.muted">Default with helper text</Field.HelperText>
      </Field.Root>
      <Field.Root invalid required>
        <Field.Label fontWeight="600">
          Email
          <Field.RequiredIndicator />
        </Field.Label>
        <Input size="lg" bg="bg.canvas" type="email" defaultValue="wanjiku@" />
        <Field.ErrorText>Please enter an email address like name@example.com.</Field.ErrorText>
      </Field.Root>
      <Field.Root disabled>
        <Field.Label fontWeight="600">Area</Field.Label>
        <Input size="lg" bg="bg.canvas" borderColor="border.strong" placeholder="Coming soon" />
        <Field.HelperText color="fg.muted">Disabled</Field.HelperText>
      </Field.Root>
    </SimpleGrid>
  );
}
