using System.Reflection;

namespace MediaManager.Database;

public static class DatabaseProject
{
	public const string SchemaName = "media";

	public static Assembly Assembly => typeof(DatabaseProject).Assembly;
}
