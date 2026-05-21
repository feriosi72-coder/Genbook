module.exports = {
  extends: ["stylelint-config-standard"],
  rules: {
    "selector-class-pattern": null,
    "selector-id-pattern": null,
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }],
    "at-rule-no-unknown": [true, { ignoreAtRules: ["tailwind", "apply", "layer", "config"] }],
    "no-descending-specificity": null,
    "custom-property-empty-line-before": null,
    "color-hex-length": null,
    "color-function-notation": null,
    "alpha-value-notation": null,
    "font-family-name-quotes": null,
    "property-no-vendor-prefix": null,
    "value-keyword-case": null,
    "media-feature-range-notation": null,
    "rule-empty-line-before": null
  }
};
