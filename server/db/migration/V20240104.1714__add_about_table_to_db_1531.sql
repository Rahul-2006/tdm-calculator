IF OBJECT_ID(N'dbo.About', N'U') IS NULL
CREATE TABLE [dbo].[About](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[title] [varchar](250) NULL,
	[displayOrder] [int] NULL,
	[content] [nvarchar](max) NULL,
 CONSTRAINT [PK__About] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

