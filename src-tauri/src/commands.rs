use ai_codelint::linter::LintResult;
use serde::Serialize;
use tauri::AppHandle;

#[derive(Serialize)]
pub struct LintResultOveride {
    overview: String,
    start_line: u32,
    end_line: u32,
}

impl From<LintResult> for LintResultOveride {
    fn from(value: LintResult) -> Self {
        Self {
            overview: value.overview,
            start_line: value.start_line,
            end_line: value.end_line,
        }
    }
}

#[tauri::command]
pub async fn lint_contents(
    _: AppHandle,
    contents: String,
) -> Result<Vec<LintResultOveride>, String> {
    let res = ai_codelint::linter::lint(false, "code_sample", &contents, None, None)
        .await?
        .into_iter()
        .map(|r| r.into())
        .collect();
    Ok(res)
}
