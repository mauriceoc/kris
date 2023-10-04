const { generateKrisKindle } = require("./generateKrisKindle");

describe("generateKrisKindle", () => {
  const emails = [
    "dave@dave.com",
    "terry@terry.com",
    "splat@splat.com",
    "bob@hat.com",
  ];

  const moreEmails = [
    ...emails,
    "cat@cat.com",
    "elise@elise.com",
    "admin@admin.com",
    "fun@fun.com",
    "fatfrog@fatfrog.com",
    "spud@spud.com",
  ];

  describe("mock random tests", () => {
    beforeEach(() => {
      jest
        .spyOn(global.Math, "random")
        .mockReturnValueOnce(0.1)
        .mockReturnValueOnce(0.5)
        .mockReturnValue(0.6);
    });

    afterEach(() => {
      jest.spyOn(global.Math, "random").mockRestore();
    });

    it("should do expected", () => {
      const out = generateKrisKindle(emails, {});

      const expected = {
        "bob@hat.com": "splat@splat.com",
        "dave@dave.com": "terry@terry.com",
        "splat@splat.com": "dave@dave.com",
        "terry@terry.com": "bob@hat.com",
      };

      expect(out).toEqual(expected);
    });

    it("should support exclusion", () => {
      const out = generateKrisKindle(emails, {
        "terry@terry.com": ["splat@splat.com"],
      });

      const expected = {
        "bob@hat.com": "splat@splat.com",
        "dave@dave.com": "terry@terry.com",
        "splat@splat.com": "dave@dave.com",
        "terry@terry.com": "bob@hat.com",
      };

      expect(out).toEqual(expected);
    });

    it("should support exclusion again", () => {
      const out = generateKrisKindle(emails, {
        "splat@splat.com": ["bob@hat.com"],
      });

      const expected = {
        "bob@hat.com": "dave@dave.com",
        "dave@dave.com": "splat@splat.com",
        "splat@splat.com": "terry@terry.com",
        "terry@terry.com": "bob@hat.com",
      };

      expect(out).toEqual(expected);
    });

    it("should support multiple exclusions", () => {
      const out = generateKrisKindle(moreEmails, {
        "splat@splat.com": ["bob@hat.com", "terry@terry.com"],
      });

      const expected = {
        "admin@admin.com": "cat@cat.com",
        "bob@hat.com": "fatfrog@fatfrog.com",
        "cat@cat.com": "elise@elise.com",
        "dave@dave.com": "terry@terry.com",
        "elise@elise.com": "bob@hat.com",
        "fatfrog@fatfrog.com": "splat@splat.com",
        "fun@fun.com": "spud@spud.com",
        "splat@splat.com": "fun@fun.com",
        "spud@spud.com": "dave@dave.com",
        "terry@terry.com": "admin@admin.com",
      };

      expect(out).toEqual(expected);
    });
  });

  describe("randomized tests", () => {
    for (let i = 0; i < 1000; i++) {
      it("should never have exclusions", () => {
        const out = generateKrisKindle(moreEmails, {
          "fun@fun.com": ["spud@spud.com"],
          "cat@cat.com": ["elise@elise.com", "spud@spud.com"],
          "admin@admin.com": ["spud@spud.com"],
        });

        expect(out["fun@fun.com"]).not.toBe("spud@spud.com");
        expect(out["spud@spud.com"]).not.toBe("fun@fun.com");
        expect(out["cat@cat.com"]).not.toBe("elise@elise.com");
        expect(out["cat@cat.com"]).not.toBe("spud@spud.com");
        expect(out["elise@elise.com"]).not.toBe("cat@cat.com");
        expect(out["admin@admin.com"]).not.toBe("spud@spud.com");
        expect(out["spud@spud.com"]).not.toBe("admin@admin.com");
        expect(out["spud@spud.com"]).not.toBe("cat@cat.com");
      });
    }
  });
});
