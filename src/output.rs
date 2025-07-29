use anyhow::Result;
use std::{
    collections::HashMap,
    fs,
    path::{Path, PathBuf},
};

pub struct OutDir {
    files: HashMap<String, String>,
}

impl OutDir {
    pub fn new() -> Self {
        Self {
            files: HashMap::new(),
        }
    }

    pub fn add_file(&mut self, file: &str, contents: String) -> Option<String> {
        self.files.insert(file.to_owned(), contents)
    }

    pub fn write(&mut self, dir_path: &Path) -> Result<()> {
        for (file, contents) in &self.files {
            let path = dir_path.join(PathBuf::from(file));
            if let Some(parent) = path.parent() {
                fs::create_dir_all(parent)?;
            }

            fs::write(path, contents)?;
        }

        Ok(())
    }
}
