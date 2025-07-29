use anyhow::Result;
use std::{fs, path::PathBuf, str::FromStr};
use walkdir::WalkDir;

use catppuccin::{ColorName, PALETTE};
use itertools::Itertools;

fn identify_used_colors(string: &str) -> impl Iterator<Item = ColorName> {
    PALETTE
        .into_iter()
        .flat_map(|flavor| flavor.colors.into_iter())
        .map(|color| color.name.identifier())
        .unique()
        .filter(|color| string.contains(&format!("${color}")))
        .flat_map(ColorName::from_str)
}

fn get_color_definitions(colors: &[ColorName]) -> String {
    format!(
        "{}{}",
        PALETTE
            .into_iter()
            .map(|flavor| {
                format!(
                    "body[data-theme=\"{}\"] {{{}}}",
                    flavor.name.identifier(),
                    colors
                        .iter()
                        .map(|color_name| {
                            let color = flavor.get_color(*color_name);
                            format!("--{}: {};", color.name.identifier(), color.hex)
                        })
                        .collect::<String>()
                )
            })
            .collect::<String>(),
        colors
            .iter()
            .map(|color| format!("${}: var(--{});", color.identifier(), color.identifier()))
            .collect::<String>()
    )
}

pub fn compile_css() -> Result<String> {
    let path = [".", "res", "css"].into_iter().collect::<PathBuf>();

    let scss = WalkDir::new(path)
        .into_iter()
        .flatten()
        .filter(|e| e.file_type().is_file())
        .flat_map(|file| fs::read_to_string(file.path()))
        .collect::<Vec<_>>()
        .into_iter()
        .rev()
        .collect::<String>();

    let used_colors = identify_used_colors(&scss).collect_vec();

    let theme_definition = get_color_definitions(&used_colors);

    let scss = format!("{theme_definition}{scss}");

    let options = grass::Options::default().style(grass::OutputStyle::Compressed);

    let css = grass::from_string(scss, &options)?;

    Ok(css)
}
